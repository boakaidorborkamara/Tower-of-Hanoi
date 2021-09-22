let blocks = document.querySelectorAll(".blocks");

blocks.forEach("block")
{
    console.log("block");
}
console.log(blocks);

// for (i = 0; i < blocks.length; i++)
// {
//     console.log(blocks[i]);
//     blocks[i].addEventListener("click", selectElement);
// }

function selectElement(e)
{
    let x = e.target.tagName;
    console.log(x);
}

blocks.ad