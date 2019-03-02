#!/usr/bin/env bash
ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
NODE_DIR="${ROOT_DIR}/node_modules"
SASS_DIR="${ROOT_DIR}/scss"
CSS_DIR="${ROOT_DIR}/css"
JS_DIR="${ROOT_DIR}/js"

# Copy over js libraries
cp -f "${NODE_DIR}/jquery/dist/jquery.min.js" "${JS_DIR}"
cp -f "${NODE_DIR}/bootstrap/dist/js/bootstrap.bundle.min.js" "${JS_DIR}"
cp -f "${NODE_DIR}/isotope-layout/dist/isotope.pkgd.min.js" "${JS_DIR}"

# Compile css
sass --no-source-map "${SASS_DIR}/style.scss" "${CSS_DIR}/style.css"
open "${ROOT_DIR}/index.html"
