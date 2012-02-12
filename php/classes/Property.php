<?php
require_once('DB_Object.php');

class Property extends DB_Object {
	function __construct () {
		echo "Property<BR>";
		parent::__construct();
	}
	function load($id) {
		$sql = "
			SELECT *
			FROM property
		";
	}
}
new Property();

?>