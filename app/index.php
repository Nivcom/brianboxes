<!DOCTYPE html>
<html lang="en">

<head>
    <title>PreppedItems</title>
    <link rel="icon" type="image/x-icon" href="imgs\bbicon.png">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="main.css">
</head>

<body>
    <div>
        <!--************************Prepped Section***************************-->
        <div class="container">
            <form action="" method="post">
                <table id="table-body">
                    <thead>
                        <tr>
                            <th>Prod-code</th>
                            <th>Prod-Num</th>
                            <th>Prepped</th>
                            <th>Status</th>
                            <th>T.TQty</th>
                            <th><img src="imgs\notes.jpg" width="50" height="40">
                                <!-- BrainBox log linking to the workplan page --></th>
                            <th> <input type="text" placeholder="Search.." id="SearchInput" onkeyup="filterFunction()">
                            </th>

                        </tr>
                    </thead>
                    <tbody id="tbody">
                    </tbody>
                </table>
            </form>
        </div>
         <div id="overlay">
    <div id="overlay-content">
        <span id="close-overlay" onclick="closeOverlay()">&times;</span>
        <h2>Before you Prep!</h2>
        <p>Are you prepping any of these? </p>
        <textarea class="overlay" id="overlay-textarea"> </textarea>
     <p> These are already prepped !</p>  
    </div>
</div>
</form>
        <!--************************End of Prepped Section***************************-->

        <script src="index.js"></script>
</body>

</html>