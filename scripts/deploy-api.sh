#!/bin/bash

STAGE=$1
FUNC=$2

if [ -n "$FUNC" ]; then
    yarn workspace server deploy:func -s $STAGE -f $FUNC
else
    yarn workspace server deploy $STAGE
fi
