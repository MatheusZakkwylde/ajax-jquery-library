//Quando o documento carregar execute
$(document).ready(function(){
    
    //Ao clicar no botão btn execute a função
    $('#btn').click(function(){
        //Criação do ajax
        $.ajax({
            method: "GET", //Tipo de método
            url: "data.php", //url do arquivo
            cache: false, //false para não salvar o cache, e true para salvar
            beforeSend: function(){ //função que é executada antes de realizar a requisição
                $("alert").removeClass("alert alert-danger").text("")
            },
            success: function(data){ //Se tudo ocorrer bem retorna o objeto com todo os dados
                console.log(data)
            },
    
            statusCode :{ //codigos de erros caso ocorrar faça algo
                404: function(){
                    $("alert").addClass("alert alert-danger alert-success").text("Nenhuma informação encontrada")
                }
            },
    
            error: function(){ //casso ocorrar algum error faça algo
                $("alert").addClass("alert alert-danger").text("Nenhuma solicitação")
            },
    
            complete: function(){
               //realiza uma ação após o carregamento
            }
        })
    })

     //verifa o id do formulario e quando aperta no botão submit os dados são enviados para cá.
     $("#form-object").submit(function(event){
        //bloqueia o comportamento padrão do submit
        event.preventDefault()
        //cria um objeto e seta todos os dados recebidos
        let object = {}
        object.name = $("#name").val()
        object.password = $$("#password").val()
        console.log(object)
        //envia os dados por ajax
        
        $.ajax({
            method:"POST",
            url: "",
            data: object,
            beforeSend: function(){
                $("#form-object").hide()
                $("#loader-form").addClass("#loader").show()
            },
            //se sucesso
            success: function(){
                //resetar todos os dados do formulário
                $("#form-object").each(function(){
                   this.reset();
                })

                $("#alert").addClass("alert alert-success").text("object cadastrado com sucesso!")
            },
            statusCode:{
                422:function(xhr){
                    console.log(xhr.status)
                    let erros = $.parseJson(xhr.responseText)
                    $.each(erros, function(key,val){
                       $("#"+key).addClass("is-invalid")
                       $("#error"+key).addClass("invalid-feedback")
                       .apeend("<span class='error-span>'"+val+"</span>")
                    })
                }
            },

            error: function(){
                $("#alert").addClass("alert alert-danger").text("Não foi possivel salvar os dados")
            },

            complete: function(){
                $("#loader-form").fideOut(800, function(){
                    $("#form-object").fadeIn(250)
                    $("#loader-form").remove("loader")
                })
            }
        })
    })
})
    