<style>
    td {
        padding: 5px;
        border: 1px solid black;
        text-align: center;
    }

    textarea {
        display: block;
        margin: 20px 0 10px;
    }
</style>

<?php

class Table {
    private $data = array();

    public function __construct($x, $y) {
        $this->data = array_fill(0, $y, array_fill(0, $x, ''));
    }

    public function setValue($x, $y, $v) {
        $this->data[$y][$x] = $v;
    }

    public function getValue($x, $y) {
        return $this->data[$y][$x];
    }

    public function randomizeNumbers() {
        foreach ($this->data as &$row) {
            array_walk($row, function(&$value) {$value = rand();});
        }
    }

    public function randomizeLetters() {
        foreach ($this->data as &$row) {
            array_walk($row, function(&$value) {$value = chr(rand(0,25)+65);});
        }
    }

    public function fillValue($v) {
        $this->data = array_fill(0, count($this->data), array_fill(0, count($this->data[0]), $v));
    }

    public function toHTML() {
        $ret = '<table>';

        foreach ($this->data as $row) {
            $ret .= '<tr>';

            foreach ($row as $x) {
                $ret .= "<td>$x</td>";
            }

            $ret .= '</tr>';
        }

        $ret .= '</table>';
        return $ret;
    }
}

if (isset($_POST['words'])) {
    $words = explode("\n", $_POST['words']);
    $words = array_map(fn($w) => trim($w), $words);
    usort($words, fn($w) => strlen($w));

    $max_len = max(strlen($words[0])+2, 12);

    var_dump($words);

    $t = new Table($max_len, $max_len);
    $t->randomizeLetters();

    $used = new Table($max_len, $max_len);
    $used->fillValue(false);

    foreach($words as $word) {
        while (true) {
            $dx = rand(0,2)-1;
            $dy = rand(0,2)-1;

            if ($dx == 0 && $dy == 0)
                continue;

            $x = rand(0,$max_len);
            $y = rand(0,$max_len);

            $n = strlen($word);
            $fine = true;

            for ($i=0; $i<$n; $i++) {
                $cx = $x + $dx * $i;
                $cy = $y + $dy * $i;

                if ($cx < 0 || $cx >= $max_len || $cy < 0 || $cy >= $max_len || $used->getValue($cx,$cy)) {
                    $fine = false;
                    break;
                }
            }

            if (!$fine)
                continue;

            for ($i=0; $i<$n; $i++) {
                $cx = $x + $dx * $i;
                $cy = $y + $dy * $i;

                $t->setValue($cx, $cy, strtoupper($word[$i]));
                $used->setValue($cx, $cy, true);
            }

            break;
        }
    }

    echo $t->toHTML();
}


?>

<form method="post">
    <textarea name="words" cols="40" rows="10"></textarea>
    <input type="submit" value="generuj">
</form>