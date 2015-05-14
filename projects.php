<?php
	
	$title = 'Entry Title';
	$languages = 'Java';
	$description = 'Curabitur id ornare eros, eget suscipit tortor. Vestibulum quis libero eu quam venenatis elementum et vitae nisi. Fusce ultrices lacinia diam sit amet accumsan.';
	$source_url = 'https://bitbucket.org/aoswalt';
	$repo_id = '%7B81dd4861-ab6f-4907-ab6e-084bbc24a93b%7D';
	$image_file = 'http://upload.wikimedia.org/wikipedia/commons/3/30/Googlelogo.png';
	$thumb_file = 'http://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Googlelogo.png/320px-Googlelogo.png';
	
	
	echo '
		<li class="entry">
			<h2>'.$title.'</h2>
			<a href="'.$image_file.'" target="_blank"><img src="'.$thumb_file.'" width="250px" height="150px" /></a>
			<div class="entry-info">
				<p><b>Languages: </b>'.$languages.'</p>
				<p class="entry-description">'.$description.'</p>
				<p class="links"><a href="'.$source_url.'">Source Code</a><a href="'.$repo_id.'">Download</a></p>
			</div>
		</li>
		';
	?>