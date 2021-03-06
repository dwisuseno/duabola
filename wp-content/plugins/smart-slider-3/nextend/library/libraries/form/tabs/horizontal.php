<?php
N2Loader::import('libraries.form.tab');

class N2TabHorizontal extends N2Tab
{

    function decorateTitle() {
        echo "<div class='n2-form-tab-horizontal'>";
    }

    function decorateGroupStart() {
        echo '<div>';
    }

    function decorateGroupEnd() {
        echo "</div>";
        echo "</div>";
    }

    function decorateElement(&$el, $out, $i) {
        echo NHtml::tag('div', array(
            'class' => 'n2-inline-block ' . N2XmlHelper::getAttribute($el->_xml, 'class')
        ), NHtml::tag('div', array(
                'class' => 'n2-form-element-mixed'
            ), NHtml::tag('div', array(
                'class' => 'n2-mixed-label'
            ), $out[0]) . NHtml::tag('div', array(
                'class' => 'n2-mixed-element'
            ), $out[1])));


    }
}