<?php
	if (isset($_POST['payload'])) {
		$payload = json_decode($_POST('payload'));
		file_put_contents('./payload_log.txt', print_r($payload, TRUE), FILE_APPEND);
	}
?>