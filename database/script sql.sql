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

create table tbl_artista(
	id int not null primary key auto_increment,
    nome varchar(100) not null,
    nome_artistico varchar(100) not null,
    data_nascimento DATE,
    foto varchar(300),
    id_pais_origem int,
    
    constraint FK_NACIONALIDADE_ARTISTA
    foreign key (id_pais_origem)
    references tbl_pais_origem(id_pais_origem)
);

create table tbl_playlist(
	id int not null primary key auto_increment,
    nome_playlist varchar(100),
    data_criacao date not null,
    capa_playlist varchar(300),
    id_usuario int not null,
    
    constraint FK_PLAYLIST_USUARIO
    foreign key (id_usuario)
    references tbl_usuario(id)
);

create table tbl_album(
	id int not null primary key auto_increment,
    nome varchar(100) not null,
    data_lancamento date not null,
    foto_album varchar(200) not null,
    id_tipo_album int,
    id_gravadora int,
    
    constraint FK_ALBUM_TIPO_ALBUM
    foreign key (id_tipo_album)
    references tbl_tipo_album(id),
    
    constraint FK_ALBUM_GRAVADORA
    foreign key (id_gravadora)
    references tbl_gravadora(id)
);

create table tbl_artista_album(
	id int not null primary key auto_increment,
    id_artista int,
    id_album int,
    
    constraint FK_ARTISTA_ALBUM_ARTISTA
	foreign key (id_artista)
    references tbl_artista(id),
    
    constraint FK_ARTISTA_ALBUM_ALBUM
    foreign key (id_album)
    references tbl_album(id)
);

create table tbl_musica_genero(
	id int not null primary key auto_increment,
    id_musica int,
    id_genero int,
    
    constraint FK_MUSICA_GENERO_MUSICA
	foreign key (id_musica)
    references tbl_musica(id),
    
    constraint FK_MUSICA_GENERO_GENERO
    foreign key (id_genero)
    references tbl_genero(id)
);

create table tbl_musica_album(
	id int not null primary key auto_increment,
    id_musica int,
    id_album int,
    
    constraint FK_MUSICA_ALBUM_MUSICA
	foreign key (id_musica)
    references tbl_musica(id),
    
    constraint FK_MUSICA_ALBUM_ALBUM
    foreign key (id_album)
    references tbl_album(id)
);

create table tbl_musica_artista(
	id int not null primary key auto_increment,
    id_musica int,
    id_artista int,
    
    constraint FK_MUSICA_ARTISTA_MUSICA
	foreign key (id_musica)
    references tbl_musica(id),
    
    constraint FK_MUSICA_ARTISTA_ARTISTA
    foreign key (id_artista)
    references tbl_artista(id)
);

create table tbl_musica_playlist(
	id int not null primary key auto_increment,
    id_musica int,
    id_playlist int,
    
    constraint FK_MUSICA_PLAYLIST_MUSICA
	foreign key (id_musica)
    references tbl_musica(id),
    
    constraint FK_MUSICA_PLAYLIST_PLAYLIST
    foreign key (id_playlist)
    references tbl_playlist(id)
);

show tables;

