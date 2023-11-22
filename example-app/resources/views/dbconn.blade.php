<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=\, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div>
        <?php
        if(DB::connection()->getPdo()){
            echo "successfully connected to DB and DB name is".DB::connection()->getDatabase;
        } 
        ?>
    </div>
</body>
</html>