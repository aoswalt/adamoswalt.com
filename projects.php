<?php
	$sql_server = 'localhost';
	$sql_username = 'root';
	$sql_password = 'root';
	$sql_dbname = 'portfolio';
	
	$conn = new mysqli($sql_server, $sql_username, $sql_password, $sql_dbname);
	
	//TODO is any error handling neccessary?
	if($conn->connect_error) {
		die('Connection failed: '.$conn->connect_error);
	}
	
	$query = 'SELECT image_file, thumb_file FROM project_images WHERE repo_id LIKE ';
	
	//TODO add a message if no repos found
	$public_bb_repos = file_get_contents('https://api.bitbucket.org/2.0/repositories/aoswalt');
	$bb_data = json_decode($public_bb_repos);
	
	$repo = $bb_data->{'values'}[0];
	$title = $repo->{'name'};
	$language = $repo->{'language'};
	$description = $repo->{'description'};
	$source_url = $repo->{'links'}->{'html'}->{'href'};
	$repo_id = $repo->{'uuid'};		//'{f2138537-f824-4475-8d02-88a2d9367f5f}';		// bb = uuid, gh = numeric
	
	$commits_json = file_get_contents('https://api.bitbucket.org/2.0/repositories/aoswalt/'.$repo_id.'/commits');
	$commits = json_decode($commits_json);
	$last_commit = strtotime($commits->{'values'}[0]->{'date'});	// saved directly as time for sorting
	
	
	$query_result = $conn->query($query.'"'.$repo_id.'"');
	$row = $query_result->fetch_assoc();
	$image_file = $row["image_file"];
	$thumb_file = $row["thumb_file"];
	
	$conn->close();
	
	echo('
		<li class="entry">
			<h2>'.$title.'</h2>
			<a href="'.$image_file.'" target="_blank"><img src="'.$thumb_file.'" width="250px" height="150px" /></a>
			<div class="entry-info">
				<p><b>Language: </b>'.$language.'</p>
				<p class="entry-description">'.$description.'</p>
				<p class="source"><a href="'.$source_url.'">Source Code</a><span>Last commit: '.date('Y-m-d', $last_commit).'</span></p>
			</div>
		</li>
		');
	?>