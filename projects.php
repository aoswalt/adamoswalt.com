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
		
		static function compare_dates_reverse($a, $b) {
			if($a->last_commit > $b->last_commit) {
				return -1;
			} else if($a->last_commit < $b->last_commit) {
				return 1;
			} else {
				return 0;
			}
		}
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
	
	$query_part = 'SELECT * FROM project_info WHERE repo_id LIKE ';
	
	
	$repos = array();
	
	// Bitbucket repos
	$public_bb_repos = file_get_contents('https://api.bitbucket.org/2.0/repositories/aoswalt');
	$bb_data = json_decode($public_bb_repos);
	
	//TODO add a message if no bb repos found
	for($i = 0; $i != count($bb_data->{'values'}); ++$i) {
		$data = $bb_data->{'values'}[$i];
		$repo = new RepoData();
		
		// placeholder if entry not in database
		$repo->title = $data->{'name'};
		//$repo->image_file = $row['image_file'];
		//$repo->thumb_file = $row['thumb_file'];
		
		// base repo data
		$repo->language = $data->{'language'};	//TODO map of more presentable language entries?
		$repo->description = $data->{'description'};
		$repo->source_url = $data->{'links'}->{'html'}->{'href'}.'/src';	// go directly to source code in bb without changing settings
		$repo->repo_id = $data->{'uuid'};		// bb = uuid, gh = numeric
		
		// get last commit date from commits page 
		$commits_json = file_get_contents('https://api.bitbucket.org/2.0/repositories/aoswalt/'.$repo->repo_id.'/commits');
		$commits = json_decode($commits_json);
		$repo->last_commit = strtotime($commits->{'values'}[0]->{'date'});	// saved directly as time for sorting
		
		// get data from sql db that is not stored with the repo
		$query_result = $conn->query($query_part.'"'.$repo->repo_id.'"');
		if($query_result->num_rows > 0) {
			$row = $query_result->fetch_assoc();
			$repo->title = $row['name'];		// github doesn't store a presentable name	//TODO fallback to $title = $repo->{'name'};
			$repo->image_file = $row['image_file'];
			$repo->thumb_file = $row['thumb_file'];
		}
		
		array_push($repos, $repo);
	}
	
	//TODO add pulling from Github
	
	$conn->close();
	
	usort($repos, array("RepoData", "compare_dates_reverse"));		// most recent first
	
	for($i = 0; $i != count($repos); ++$i) {
		//TODO add a message if nothing to display
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
	}
	?>