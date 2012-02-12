<?php
session_start();
require_once('../../php/includes/db.php');
header('Content-type: application/json');


$requestURI = explode('/', strtok($_SERVER['REQUEST_URI'], '?'));
$scriptName = explode('/',$_SERVER['SCRIPT_NAME']);
 
for($i= 0;$i < sizeof($scriptName);$i++)
        {
      if ($requestURI[$i]     == $scriptName[$i])
              {
                unset($requestURI[$i]);
            }
      }
 
$command = array_values($requestURI);

$table = isset($command[0]) ? $command[0] : FALSE;
$id = isset($command[1]) ? $command[1] : FALSE;

$response = array();
//$response['table'] = $table;
//$response['id'] = $id;

//$response['get'] = $_GET;
//$response['post'] = $_POST;

$sqlView = "
	SELECT viewname
	FROM pg_views
	WHERE viewname = :viewname
";

try {
	$sth = $db->prepare($sqlView);
	$sth->execute(array(
		'viewname' => $table
	));
	$isView = $sth->rowCount() > 0 ? TRUE : FALSE;
	$response['view'] = $isView;
} catch (Exception $e) {
}


if(!$isView) {
	$sqlPkey = "SELECT * from pkeys where table_name = '$table'";

	$sthPkey = $db->prepare($sqlPkey);
	$sthPkey->execute();
	$tableData = $sthPkey->fetchAll();
	if(isset($tableData[0]['column_name'])) {
		$pkey = $tableData[0]['column_name'];
	}
}
//$response['sqlpkey'] = $sqlPkey;
//$response['pkey'] = $pkey;

$sql = "select * from information_schema.columns where table_name = :table_name";
$sth = $db->prepare($sql);
$sth->execute(array(
	'table_name' => $table
));

$fieldData = $sth->fetchAll(PDO::FETCH_ASSOC);
foreach($fieldData as $fieldRow){
	$fields[] = $fieldRow['column_name'];
}
$response['fields'] = $fields;

//$fields = array();
//for(; $f = $sthFields->fetch(PDO::FETCH_ASSOC); $fields[] = $f['attname']){}
//print_r($fields);

if($_SERVER['REQUEST_METHOD'] == 'GET'){
	$filters = array();
	$values = array();
	$filter = FALSE;
	$sort = array();
	$sorters = array();
	
	
	if(isset($_GET['filter']) && $filter = json_decode($_GET['filter'], true)) {
		foreach($filter as $item) {
			$key = $item['property'];
			if(!(array_search($key, $fields) === FALSE)) {
				$filters[] = "$key = :$key";
				$values[$key] = $item['value'];
			}
		}
	}
	
  
  if($id){
    $filters[] = "$pkey = :$pkey";
    $values[$pkey] = $id;
  } else {
    foreach($_GET as $key => $value){
        if(!(array_search($key, $fields) === FALSE)) {
          $filters[] = "$key = :$key";
          $values[$key] = $value;
        }
      }
  }
	$response['filters'] = $filters;
	//print_r($filters);
  if(count($filters) > 0) $filter = TRUE;
  
  $sql = "SELECT * FROM $table";
  
  if(isset($filter) && $filter){
    $sql .= " WHERE ";
    $sql .= implode(' AND ', $filters);
  }
  //if($filter) print_r($filters);

	if(isset($_GET['sort']) && $sort = json_decode($_GET['sort'], true)) {
		$response['sort'] = $sort;
		foreach($sort as $sorter) {
			$sorters[] = $sorter['property'] . " " . $sorter['direction'];
		}
		//$values["sort" . $sorter['property']] = $item['value'];
		$response['sorters'] = $sorters;
		$sql .= " ORDER BY " . implode(", ", $sorters);
	}

  
  //$sql .= " LIMIT 10";
	try {
		$sth = $db->prepare($sql);
		$sth->execute($values);
		$items = $sth->fetchAll(PDO::FETCH_ASSOC);
		$response['records'] = $items;
		$response['success'] = TRUE;
	} catch(Exception $e) {
		$response['error'] = $e->getMessage();
		$response['success'] = FALSE;
	}
  $response['sql'] = $sql;
}
if($_SERVER['REQUEST_METHOD'] == 'POST' && !$isView){
	$response['success'] = FALSE;

	//If POST parameters exist, use those. Otherwise use raw POST data.
	if(!($postValues = $_POST)){
		$postValues = json_decode(file_get_contents("php://input"), true);
	}
	$response['postValues'] = $postValues;
	
	//Use just the keys from the post data that are actually in the table.
	$keys = array_intersect(array_keys($postValues), $fields);
	$response['keys'] = $keys;
	
	//For each key, add an element from postData to the values	
	foreach($keys as $key) {
		$values[$key] = $postValues[$key];
	}
	
	$sql = "INSERT INTO $table (";
	$sql .= implode(', ', $keys) . ') values (:';
	$sql .= implode(', :', $keys) . ') RETURNING *';
	$response['sql'] = $sql;
	$sth = $db->prepare($sql);
	try {
		$sth->execute($values);
		$items = $sth->fetchAll(PDO::FETCH_ASSOC);
		$response['records'] = $items;
		$response['success'] = TRUE;
	} catch (Exception $e) {
		$response['error'] = $e->getMessage();
		$response['success'] = FALSE;
	}
}
if($_SERVER['REQUEST_METHOD'] == 'PUT' && !$isView){
	$response['success'] = FALSE;
    $put = json_decode(file_get_contents("php://input"), true);
	$response['put'] = $put;
	$values = array();
	$sets = array();
	foreach($put as $key => &$value) {
		if(array_search($key, $fields) !== FALSE) {
			if($value == '') {
				$value = null;
			}
			$values[$key] = $value;
			$sets[] = "$key = :$key";
		}
	}
	$values[$pkey] = $id;
	$db->beginTransaction();
	
	$sql = "UPDATE $table SET ";

	$sql .= implode(', ', $sets);
	$sql .= " WHERE $pkey = :$pkey";

	
	$response['sql'] = $sql;
	$sth = $db->prepare($sql);
    try {
		$response['values'] = $values;
		$sth->execute($values);
		
		//Get the modified record.
		$sql = "SELECT * from $table where $pkey = :$pkey";
		//$response['sql'] = $sql;
		$sth = $db->prepare($sql);
		$sth->execute(array($pkey => $values[$pkey]));
		for(;$modfiedRecord = $sth->fetch(PDO::FETCH_ASSOC);) {
			$response['records'][] = $modfiedRecord;
		}
			
            //$response['sql'] .= $sql;
        $db->commit();
        $response['success'] = TRUE;
    } catch (Exception $e) {
        $db->rollBack();
        $response['success'] = FALSE;
        $response['error'] = $e->getMessage();
    }
}
if($_SERVER['REQUEST_METHOD'] == 'DELETE' && !$isView){
	//echo 'test';
    $response['success'] = FALSE;
	if(isset($id)) {
		$response['id'] = $id;
		$sql = "
			DELETE from $table
			WHERE $pkey = :id
		";
		try {
			$sth = $db->prepare($sql);
			$sth->execute(array(
				'id' => $id
			));
			$response['success'] = TRUE;
		} catch (Exception $e) {
			$response['error'] = $e->getMessage();
			$response['success'] = FALSE;
		}
		
	} else {
		$put = array();
		parse_str(file_get_contents("php://input"), $put);
		$items = json_decode($put, TRUE);
		$response['items'] = $items;
	}
}
echo json_encode($response);
?>