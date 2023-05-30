const plugin=({widgets, simulator, vehicle}) =>{
    const container=document.createElement("div")
    container.innerHTML=(`
    <head>
    <title>Tree Diagram</title>
    <style>
      .topNode{
          height:13%;
          width:23%;
          position:absolute;
          left: 40%;
          top:10%;
          background-color:aquamarine;
          text-align:center;
          border-radius: 5px;
          border: 1px solid gray;
          font-size:80% ;
      }
      .middleNode {
        height:13%;
        width:23%;
          position:absolute;
          left: 40%;
          top:40%;
          background-color:aquamarine;
          text-align:center;
          border-radius: 5px;
          border: 1px solid gray;
          font-size:80% ;
      }
      .bottomNode {
        height:13%;
        width:23%;
          position:absolute;
          left: 40%;
          top:75%;
          background-color:aquamarine;
          text-align:center;
          border-radius: 5px;
          border: 1px solid gray;
          font-size:80% ;
      }
      .bottomLeftNode {
        height:13%;
        width:23%;
          position:absolute;
          left: 10%;
          top:75%;
          background-color:aquamarine;
          text-align:center;
          border-radius: 5px;
          border: 1px solid gray;
          font-size:80% ;
      }
      .bottomRightNode {
        height:13%;
        width:23%;
          position:absolute;
          left: 70%;
          top:75%;
          background-color:aquamarine;
          text-align:center;
          border-radius: 5px;
          border: 1px solid gray;
          font-size:80% ;
      }
    </style>
  </head>
  <body>
  
      <div id="flowChart" style="position: block;">
      </div>
      <button id="drawTree" type="submit">test</button>

    </body> 
    `)


    const tt ={
        val:"Vehicle Key Detection",
        left:null,
        right:null,
        middle:{
            val:"Driver Identification",
            left:null,
            right:null,
            middle:{
                val:"Check Memory Data",
                left:null,
                right:null,
                middle:{
                    val:"Judge",
                    left:{
                        val:"Pull Driver 1",
                        left:null,
                        right:null,
                        middle:{}
                    },
                    right:{
                        val:"Pull Driver 2",
                        left:null,
                        right:null,
                        middle:{}
                    },
                    middle:{
                        val:"Pull Driver 3",
                        left:null,
                        right:null,
                        middle:{}
                    }
                }
            }
        }
    }   

    container.querySelector('#drawTree').addEventListener('click',function(){
        drawTree(tt);
    })

    var previousVal = null;
    function drawTree(tree) {
        var space = container.querySelector('#flowChart');
        var html = "";
        var option = 0;
        if(tree.left==null){
            if(tree.right==null){
                option = 4;
            }else{
                option = 2;
            }
        }else{
            if(tree.right==null){
                option = 3;
            }else{
                option = 1;
            }
        }
        html += `
        <div style="height: 200px;width:200px;background-image:url(./`+ option +`.png);background-size: 100%;background-repeat:no-repeat;border-width:1px;border-color:#000">
        `;
        html += `
        <div class="middleNode">
        `+tree.val +`
        </div>
        `;
        if(previousVal!=null){
            html += `
            <div class="topNode">
            `+previousVal +`
            </div>
            `;
        }else{

        }
        if(tree.left!=null){
            html += `
            <div class="bottomLeftNode">
            `+tree.left.val +`
            </div>
            `;
        }
        if(tree.right!=null){
            html += `
            <div class="bottomRightNode">
            `+tree.right.val +`
            </div>
            `;
        }
        if(tree.middle!=null){
            html += `
            <div class="bottomNode">
            `+tree.middle.val +`
            </div>
            `;
        }
        html += `          </div>`
        space.innerHTML = html;
        previousVal = tree.val;
        setTimeout(function(){
            drawTree(tree.middle)
        },2000)
    }








    widgets.register("FlowChart",
        (box) =>{
        box.injectNode(container)
    })
    

    return {}
    }
     
    export default plugin