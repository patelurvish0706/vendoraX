<?php
// delete cookie
setcookie("vendor_token", "", time()-3600, "/", "", false, true);
setcookie("PHPSESSID", "", time() - 3600, "/");

// optional: destroy session if used
session_destroy();

echo "logout";
?>