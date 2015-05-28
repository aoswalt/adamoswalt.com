<?php
	include('sql_connection_info.php');
	$conn = new mysqli($sql_server, $sql_username, $sql_password, $sql_dbname);
	
	if($conn->connect_error) {
		//TODO proper error message
		die('Connection failed: '.$conn->connect_error);
	}
	
	$query = 'SELECT * FROM projects WHERE hidden = 0 ORDER BY last_commit DESC';
	$query_result = $conn->query($query);
	
	if($query_result->num_rows == 0) {
		//TODO proper error message
		die('No entries found');
	}
	
	for($i = 0; $i != $query_result->num_rows; ++$i) {
		$row = $query_result->fetch_assoc();
		
		echo('
			<li class="entry">
				<h2>'.$row['title'].'</h2>
				<a href="'.$row['image_file'].'" target="_blank"><img src="'.$row['thumb_file'].'" width="250px" height="150px" /></a>
				<div class="entry-info">
					<p><b>Language: </b>'.$row['language'].'</p>
					<p class="entry-description">'.$row['description'].'</p>
					<p class="source"><a href="'.$row['source_url'].'">Source Code</a><span>Last commit: '.$row['last_commit'].'</span></p>
				</div>
			</li>
			');
	}
?>