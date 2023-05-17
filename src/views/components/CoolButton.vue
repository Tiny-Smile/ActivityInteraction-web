<template>
  <el-button class="button-bevel orange" :disabled="disabled">
    <slot></slot>
  </el-button>
</template>

<script>
  export default {
    name: 'Button',
    props: {
      disabled: Boolean
    }
  };
</script>

<style scoped>
  /*  按钮  */
  .orange {
    background: rgb(255,183,0);
    background: -moz-linear-gradient(top,  rgba(255,183,0,1) 0%, rgba(255,140,0,1) 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(255,183,0,1)), color-stop(100%,rgba(255,140,0,1)));
    background: -webkit-linear-gradient(top,  rgba(255,183,0,1) 0%,rgba(255,140,0,1) 100%);
    background: -o-linear-gradient(top,  rgba(255,183,0,1) 0%,rgba(255,140,0,1) 100%);
    background: -ms-linear-gradient(top,  rgba(255,183,0,1) 0%,rgba(255,140,0,1) 100%);
    background: linear-gradient(to bottom,  rgba(255,183,0,1) 0%,rgba(255,140,0,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffb700', endColorstr='#ff8c00',GradientType=0 );
    border: 1px solid #e59500;
  }
  .orange:hover {
    background: rgb(255,203,72);
    background: -moz-linear-gradient(top,  rgba(255,203,72,1) 0%, rgba(255,156,35,1) 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(255,203,72,1)), color-stop(100%,rgba(255,156,35,1)));
    background: -webkit-linear-gradient(top,  rgba(255,203,72,1) 0%,rgba(255,156,35,1) 100%);
    background: -o-linear-gradient(top,  rgba(255,203,72,1) 0%,rgba(255,156,35,1) 100%);
    background: -ms-linear-gradient(top,  rgba(255,203,72,1) 0%,rgba(255,156,35,1) 100%);
    background: linear-gradient(to bottom,  rgba(255,203,72,1) 0%,rgba(255,156,35,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffcb48', endColorstr='#ff9c23',GradientType=0 );
  }

  .button-bevel {
    font-family: Helvetica, sans-serif;
    font-size: 16px;
    color: #fff;
    text-decoration: none;
    display: inline-block;
    text-align: center;
    padding: 7px 80px 9px;
    margin: .5em .5em .5em 0;
    cursor: pointer;
    text-shadow: 0 1px 1px rgba(0,0,0,0.4);
    transition: 0.1s linear;
    border-radius: 2px;
    box-shadow: inset rgba(255,255,255,0.3) 1px 1px 0;
  }
  .button-bevel.orange {
    box-shadow: #c46d00 0 6px 0px, rgba(0, 0, 0, 0.3) 0 10px 3px;
  }

  .button-bevel.orange:active {
    box-shadow: #c46d00 0 3px 0, rgba(0, 0, 0, 0.2) 0 6px 3px;
  }

</style>
