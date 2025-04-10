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

create table tbl_genero (
    id int not null primary key auto_increment,
    genero varchar(100) not null
)

create table  tbl_pais_origem (
	id_pais_origem int not null primary key auto_increment,
    pais varchar(100) not null
);


create table tbl_usuario (
	id int not null primary key auto_increment,
    nome varchar(100) not null,
    email varchar(100) not null,
    senha varchar(100) not null,
    data_nascimento varchar(100) not null
);

create table tbl_gravadora (
	id int not null primary key auto_increment,
    nome varchar(100) not null,
    ano_fundacao year,
    telefone varchar(20),
    logotipo varchar(200) not null
);

create table tbl_tipo_album(
	id int not null primary key auto_increment,
    tipo_album varchar (50) not null
);

show tables;

