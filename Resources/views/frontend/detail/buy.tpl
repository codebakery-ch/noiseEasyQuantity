{extends file="parent:frontend/detail/buy.tpl"}

{block name='frontend_detail_buy_quantity_select' append}
    <div class="decoy_wrapper">
        <button class="decoy_btn" type="button" id="qPlus" onclick="increaseQnty()">
            <i class="fa fa-plus"></i>
        </button>
        <input type="text" id="sQuantity_decoy" value="1"/>
        <button class="decoy_btn disabled" type="button" id="qMinus" onclick="decreaseQnty()">
            <i class="fa fa-minus"></i>
        </button>
    </div>
{/block}
