<?php

class DB_Object {
	protected $table;
	function __construct() {
		require_once('../includes/db.php');
		echo "DB_Object<BR>";
		$this->table = $table;
	}
	function load() {
	}
	function save() {
	}
}


?>