create database db_controle_musicas_aa;

use db_controle_musicas_aa;

create table tbl_musica (
	id int not null primary key auto_increment,
    nome varchar(100) not null ,
    duracao time not null,
    data_locamento date not null,
    letra text,
    link varchar(200)
);

show tables;

