<?php

/**
 * Class N2Filesystem
 */
class N2Filesystem extends N2FilesystemAbstract
{

    public function __construct() {
        $this->_basepath    = realpath(WP_CONTENT_DIR);
        $this->_librarypath = str_replace($this->_basepath, '', N2LIBRARY);
    }

    public static function getImagesFolder() {
        return N2Platform::getPublicDir();
    }
}