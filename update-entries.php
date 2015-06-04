<?php
	//TODO(adam): exception handling
	
	include('secret.php');
	include('sql_connection_info.php');
	
	if(!isset($_SERVER['HTTP_X_HUB_SIGNATURE'])) {
		throw new RuntimeException('Missing secret signature.');
	}
	
	$raw_data = file_get_contents('php://input');
	
	if($_SERVER['HTTP_X_HUB_SIGNATURE'] !== 'sha1='.hash_hmac('sha1', $raw_data, $secret_key)) {
		throw new RuntimeException('Secret does not match.');
	}
	
	
	$payload = json_decode($raw_data);
	$last_commit_date = date('Y-m-d', strtotime($payload->{'commits'}[0]->{'timestamp'}));
	$repo_id = $payload->{'repository'}->{'id'};
	$update_query = 'UPDATE projects SET last_commit = "'.$last_commit_date.'" WHERE repo_id LIKE "'.$repo_id.'"';
	
	$conn = new mysqli($sql_server, $sql_username, $sql_password, $sql_dbname);
	
	if($conn->connect_error) {
		file_put_contents('./errors.txt', date('Y-m-d H:i').' Connect error: '.$conn->error, FILE_APPEND);
		throw new RuntimeException('Connection failed: '.$conn->connect_error);
	}
	
	$result = $conn->query($update_query);
	if(!$result) {
		file_put_contents('./errors.txt', date('Y-m-d H:i').' Update error: '.$conn->error, FILE_APPEND);
	}
	
	$conn->close();
?>