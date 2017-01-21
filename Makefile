PACKAGENAME=funce

.PHONY: help
help:
    @echo 'Please use "make <target>" where <target> is one of'
    @echo '  upgrade   - update installation'
    @echo '  clean     - remove any temporary build products'
    @echo '  cleanall  - remove bower components and node models

.PHONY: upgrade
upgrade:
    git fetch --all
    git reset --hard origin/master
    @echo "$@ done."

.PHONY: clean
clean:
    find . -name "*.tmp" | xargs -r rm
    find . -name "*.sass-cache" | xargs -r rm
    @echo "$@ done."

.PHONY: cleanall
cleanall:
    find . -name "*.tmp" | xargs -r rm
    find . -name "*.sass-cache" | xargs -r rm
    rm -fr bower_components
    rm -fr node_modules
    @echo "$@ done."