yarn build && scp -r -i "~/.ssh/emmanueloctavi0.comKeyPair.pem" ./dist/* ubuntu@ec2-54-86-122-129.compute-1.amazonaws.com:/var/www/devtools/html
