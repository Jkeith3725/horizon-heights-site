#!/bin/bash
# Check for uploads
export SSHPASS="1ztHc8O40IdZUD8FI3RG"
sshpass -e sftp -oBatchMode=no -oStrictHostKeyChecking=no -P 22 jkeith3725.wordpress.com@sftp.wp.com <<EOF
ls -R wp-content/uploads
bye
EOF
