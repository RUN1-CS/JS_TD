<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tower Defense</title>
    <link rel="stylesheet" href="index.css">
<body>
    <canvas id="bg" width="500" height="500"></canvas>
    <canvas id="mg" width="500" height="500"></canvas>
    <canvas id="fg" width="500" height="500"></canvas>  
    <aside>
        <?php 
            for($i = 0; $i <= 5; $i++){
                ?>
                <td>
                    <select name="tower-<?php echo $i ?>" id="slot-<?php echo $i ?>" class="towers">
                        <?php include './options.php'; ?>   
                    </select>
                </td>
                <?php
            }
        ?>
        <button id="start">Start</button>
        <span id="status"></span>
        <span id="round"></span>
        <span id="frame"></span>
        <span id="health"></span>
    </aside>
    <script type="module" src="JS/gejm.js"></script>
</body>
</html>