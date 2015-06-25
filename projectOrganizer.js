//  _ _ _ _   _      _
//    | |    | |\  /| |
//    | |    | | \/ | |
//  __|_|    |_|    |_|
// 
//  Versão 0.1
// 
//  Plugin para apresentação de projetos organizados em seções.
//  Novos projetos devem ser adicionados no formato JSON no arquivo projects.js seguindo a estrutura de exemplo.

var matrix = {};

function myProjects(arr) {

    function Project(name, link, description, logo){
        this.name = name;
        this.link = link;
        this.logo = logo;
        this.description = description;
    }

    function addToSection(obj, property, value){
        if(obj[property] == undefined)
            obj[property] = [];
        obj[property].push(value);
    }    
    
    var i;
    var sections = [];
    sections.push("todos");

    for(i = 0; i<arr.length; i++) {

        var contain = false;
        for (var j = sections.length - 1; j >= 0; j--) {
            if(sections[j] in arr[i].section){
                contain = true;
                break;
            };          
        };

        for (var j = 0; j < arr[i].section.length; j++) {                   
                    addToSection(matrix, arr[i].section[j], new Project(arr[i].name, arr[i].link, arr[i].description, arr[i].logo));
        };      
        addToSection(matrix, sections[0], new Project(arr[i].name, arr[i].link, arr[i].description, arr[i].logo));      

        if (!contain) {
            sections.push(arr[i].section);          
        };
        
    }
    
    var menu = document.getElementById("sections");    
    var contentMenu = "<ul>";    

    for(section in matrix){
        var callFunction = "updateContent(\""+section+"\")";
        contentMenu += "<li><a onclick="+callFunction+" href=\"#"+section+"\">"+section+"</a></li>";        
    }

    contentMenu += "</ul>";
    menu.innerHTML = contentMenu;        
    updateContent("todos");
}

function updateContent(section){                
    var content = document.getElementById("projects");
    content.innerHTML = "";
    var text = "<div class='row'>";
    for(project in matrix[section]){                                
        //Alterar aqui a estrutura do conteudo.
        text += '<div class="col s12 m4"><div class="card small"><div class="card-image"><img src="'+matrix[section][project].logo+'"><span class="card-title" style="text-shadow: 1px 1px 1px black">'+matrix[section][project].name+'</span></div><div class="card-content"><p>'+matrix[section][project].description+'</p></div><div class="card-action"><a href="'+matrix[section][project].link+'">Página do Projeto</a></div></div></div>';        
    }
    text += "</div>";
    content.innerHTML += text;
}

$(document).ready(function(){           
            $("a").click(function(){
                $("#projects").hide();                              
                $("#projects").fadeIn();                
            });                    
});