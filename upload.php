<?php
/********如果fileUpLoad.php看不太懂，可以参考一下这个文件*******/

$result['user']=$_POST['user'];
$result['pass']=$_POST['pass'];
$result['paths']=array(); // 保存图片地址

//将批量上传之后的图片数组，改造成多个一维数组,放到$imgs里
$imgs=array();
foreach ($_FILES['imgs']['name'] as $k => $v) {
	if($_FILES['imgs']['size'][$k]==0)  continue;
	$imgs[]=array(
		'name'=>$v,
		'type'=>$_FILES['imgs']['type'][$k],
		'tmp_name'=>$_FILES['imgs']['tmp_name'][$k],
		'error'=>$_FILES['imgs']['error'][$k],
		'size'=>$_FILES['imgs']['size'][$k]
	);
}
$_FILES=$imgs;  //重新赋值

//循环所有的图片一张一张上传
foreach ($imgs as $k => $v) {
	$result['paths'][]=uploadOne($k);
}

//封装上传一张图片的方法
function uploadOne($imgName){
	if(isset($_FILES[$imgName]) && $_FILES[$imgName]['error'] == 0){
		$name=$_FILES[$imgName]['name'];
		$tmp_name=$_FILES[$imgName]['tmp_name'];
		// extract($_FILES[$imgName]) 
		$path='face/'.md5(uniqid()).strtolower(strstr($name, '.'));
		if(move_uploaded_file($tmp_name,$path)){
			$path=strstr($path,$path[0]);  //图片的存储地址
			return $path;	
		};
	}
}
echo json_encode($result);
