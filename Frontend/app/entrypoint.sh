#!/bin/sh

if [ "$APPLICATION_MODE" = "production" ]; then
    npm run build

fi 


npm run dev 


