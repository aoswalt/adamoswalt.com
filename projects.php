<?php
	class RepoData {
		public $title;
		public $language;
		public $description;
		public $source_url;
		public $last_commit;
		public $image_file;
		public $thumb_file;
		public $repo_id;
	}
	
	$sql_server = 'localhost';
	$sql_username = 'root';
	$sql_password = 'root';
	$sql_dbname = 'portfolio';
	
	$conn = new mysqli($sql_server, $sql_username, $sql_password, $sql_dbname);
	
	if($conn->connect_error) {
		//TODO proper error handling for page to still load
		die('Connection failed: '.$conn->connect_error);
	}
	
	$query = 'SELECT * FROM project_info WHERE repo_id LIKE ';
	
	
	$repos = array();
	
	$public_bb_repos = file_get_contents('https://api.bitbucket.org/2.0/repositories/aoswalt');
	$bb_data = json_decode($public_bb_repos);
	$data = $bb_data->{'values'}[0];
	
	
	$repo = new RepoData();
	
	$repo->language = $data->{'language'};	//TODO map of prettier language entries?
	$repo->description = $data->{'description'};
	$repo->source_url = $data->{'links'}->{'html'}->{'href'}.'/src';	// go directly to source code in bb without changing settings
	$repo->repo_id = $data->{'uuid'};		// bb = uuid, gh = numeric
	
	$commits_json = file_get_contents('https://api.bitbucket.org/2.0/repositories/aoswalt/'.$repo->repo_id.'/commits');
	$commits = json_decode($commits_json);
	$repo->last_commit = strtotime($commits->{'values'}[0]->{'date'});	// saved directly as time for sorting
	
	
	$query_result = $conn->query($query.'"'.$repo->repo_id.'"');
	$row = $query_result->fetch_assoc();
	$repo->title = $row['name'];		// github doesn't store a presentable name	//TODO fallback to $title = $repo->{'name'};
	$repo->image_file = $row['image_file'];
	$repo->thumb_file = $row['thumb_file'];
	
	array_push($repos, $repo);
	
	$conn->close();
	
	$i = 0;
	//TODO add a message if no repos found
	
	echo('
		<li class="entry">
			<h2>'.$repos[$i]->title.'</h2>
			<a href="'.$repos[$i]->image_file.'" target="_blank"><img src="'.$repos[$i]->thumb_file.'" width="250px" height="150px" /></a>
			<div class="entry-info">
				<p><b>Language: </b>'.$repos[$i]->language.'</p>
				<p class="entry-description">'.$repos[$i]->description.'</p>
				<p class="source"><a href="'.$repos[$i]->source_url.'">Source Code</a><span>Last commit: '.date('Y-m-d', $repos[$i]->last_commit).'</span></p>
			</div>
		</li>
		');
	?>