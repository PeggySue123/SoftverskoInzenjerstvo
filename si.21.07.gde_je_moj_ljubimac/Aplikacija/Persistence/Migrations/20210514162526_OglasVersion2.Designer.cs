﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Persistence;

namespace Persistence.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20210514162526_OglasVersion2")]
    partial class OglasVersion2
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.1");

            modelBuilder.Entity("Domain.Korisnik", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Adresa")
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .HasColumnType("TEXT");

                    b.Property<string>("Korisnicko_Ime")
                        .HasColumnType("TEXT");

                    b.Property<string>("Licno_Ime")
                        .HasColumnType("TEXT");

                    b.Property<string>("Lozinka")
                        .HasColumnType("TEXT");

                    b.Property<int>("Ocena")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Opstina")
                        .HasColumnType("TEXT");

                    b.Property<string>("Prezime")
                        .HasColumnType("TEXT");

                    b.Property<string>("Security_Answer")
                        .HasColumnType("TEXT");

                    b.Property<string>("Security_Question")
                        .HasColumnType("TEXT");

                    b.Property<int>("Status_naloga")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Tip_korisnika")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Korisnici");
                });

            modelBuilder.Entity("Domain.Oglas", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Boja")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DateTime")
                        .HasColumnType("TEXT");

                    b.Property<string>("Lokacija")
                        .HasColumnType("TEXT");

                    b.Property<string>("Naslov")
                        .HasColumnType("TEXT");

                    b.Property<string>("Opis")
                        .HasColumnType("TEXT");

                    b.Property<bool?>("Papiri")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Pol")
                        .HasColumnType("TEXT");

                    b.Property<string>("Rasa")
                        .HasColumnType("TEXT");

                    b.Property<float?>("Starost")
                        .HasColumnType("REAL");

                    b.Property<bool?>("Sterilisan")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Tip_Oglasa")
                        .HasColumnType("TEXT");

                    b.Property<bool?>("Vakcinisan")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Vrsta")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Oglasi");
                });
#pragma warning restore 612, 618
        }
    }
}
