#!/bin/bash

# Get version number
yarn release --dry-run --no-ci | grep -oP 'The next release version is \K[0-9]+\.[0-9]+\.[0-9]+' > .version

VERSION=$(cat .version)

if [ -s .version ]; then
    echo "Next version: $VERSION"
    echo "::set-output name=VERSION::$VERSION"
else
    # Output failure reason
    yarn release --dry-run --no-ci
    echo "No new version. Canceling deploy."
fi
cat .version | awk '{print "PACKAGE_VERSION="$1}' >> .env
