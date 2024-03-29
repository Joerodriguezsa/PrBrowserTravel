USE [PruebaBrowserTravel]
GO
/****** Object:  Table [dbo].[EstadoVehiculo]    Script Date: 26/02/2024 3:06:19 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EstadoVehiculo](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IdVehiculo] [int] NOT NULL,
	[IdUbicacionRecogida] [int] NOT NULL,
	[IdUbicacionDevolucion] [int] NOT NULL,
	[Estado] [bit] NOT NULL,
 CONSTRAINT [PK_Disponibilidad] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Ubicaciones]    Script Date: 26/02/2024 3:06:19 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Ubicaciones](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Ubicacion] [varchar](150) NOT NULL,
	[Estado] [bit] NOT NULL,
 CONSTRAINT [PK_Ubicaciones] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Vehiculos]    Script Date: 26/02/2024 3:06:19 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Vehiculos](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Referencia] [varchar](150) NOT NULL,
	[IdUbicacion] [int] NOT NULL,
	[Disponible] [bit] NOT NULL,
 CONSTRAINT [PK_Vehiculos] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[EstadoVehiculo] ON 

INSERT [dbo].[EstadoVehiculo] ([Id], [IdVehiculo], [IdUbicacionRecogida], [IdUbicacionDevolucion], [Estado]) VALUES (1, 1, 1, 2, 1)
INSERT [dbo].[EstadoVehiculo] ([Id], [IdVehiculo], [IdUbicacionRecogida], [IdUbicacionDevolucion], [Estado]) VALUES (3, 7, 2, 3, 1)
SET IDENTITY_INSERT [dbo].[EstadoVehiculo] OFF
GO
SET IDENTITY_INSERT [dbo].[Ubicaciones] ON 

INSERT [dbo].[Ubicaciones] ([Id], [Ubicacion], [Estado]) VALUES (1, N'Almacen 1', 1)
INSERT [dbo].[Ubicaciones] ([Id], [Ubicacion], [Estado]) VALUES (2, N'Almacen 2', 1)
INSERT [dbo].[Ubicaciones] ([Id], [Ubicacion], [Estado]) VALUES (3, N'Almacen 3', 1)
INSERT [dbo].[Ubicaciones] ([Id], [Ubicacion], [Estado]) VALUES (4, N'Alamcen 4', 1)
INSERT [dbo].[Ubicaciones] ([Id], [Ubicacion], [Estado]) VALUES (5, N'Almacen 5', 1)
INSERT [dbo].[Ubicaciones] ([Id], [Ubicacion], [Estado]) VALUES (6, N'Almacen 6', 1)
INSERT [dbo].[Ubicaciones] ([Id], [Ubicacion], [Estado]) VALUES (7, N'Almacen 7', 1)
SET IDENTITY_INSERT [dbo].[Ubicaciones] OFF
GO
SET IDENTITY_INSERT [dbo].[Vehiculos] ON 

INSERT [dbo].[Vehiculos] ([Id], [Referencia], [IdUbicacion], [Disponible]) VALUES (1, N'Volswagen Gol Modelo 2022 Placa BBB123', 4, 0)
INSERT [dbo].[Vehiculos] ([Id], [Referencia], [IdUbicacion], [Disponible]) VALUES (4, N'Volswagen Gol Modelo 2020 Placa CCC123', 4, 1)
INSERT [dbo].[Vehiculos] ([Id], [Referencia], [IdUbicacion], [Disponible]) VALUES (7, N'Volswagen Nivus Modelo 2023 Placa AAA123', 4, 0)
SET IDENTITY_INSERT [dbo].[Vehiculos] OFF
GO
ALTER TABLE [dbo].[EstadoVehiculo]  WITH CHECK ADD  CONSTRAINT [FK_Disponibilidad_Ubicaciones_Recogida] FOREIGN KEY([IdUbicacionRecogida])
REFERENCES [dbo].[Ubicaciones] ([Id])
GO
ALTER TABLE [dbo].[EstadoVehiculo] CHECK CONSTRAINT [FK_Disponibilidad_Ubicaciones_Recogida]
GO
ALTER TABLE [dbo].[EstadoVehiculo]  WITH CHECK ADD  CONSTRAINT [FK_Disponibilidad_UbicacionesRecogida] FOREIGN KEY([IdUbicacionDevolucion])
REFERENCES [dbo].[Ubicaciones] ([Id])
GO
ALTER TABLE [dbo].[EstadoVehiculo] CHECK CONSTRAINT [FK_Disponibilidad_UbicacionesRecogida]
GO
/****** Object:  StoredProcedure [dbo].[ActualizarUbicacion]    Script Date: 26/02/2024 3:06:19 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[ActualizarUbicacion]
	@Id Varchar(150),
	@Estado Bit
AS
BEGIN
	UPDATE [dbo].[Ubicaciones]
	   SET [Estado] = @Estado
	 WHERE Id = @Id
END
GO
/****** Object:  StoredProcedure [dbo].[InsertaEstadoVehiculo]    Script Date: 26/02/2024 3:06:19 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[InsertaEstadoVehiculo]
	 @IdVehiculo int
    ,@IdUbicacionRecogida int
    ,@IdUbicacionDevolucion int
AS
BEGIN

INSERT INTO [dbo].[EstadoVehiculo]
           ([IdVehiculo]
           ,[IdUbicacionRecogida]
           ,[IdUbicacionDevolucion]
           ,[Estado])
     VALUES(
            @IdVehiculo
           ,@IdUbicacionRecogida
           ,@IdUbicacionDevolucion
           ,1)

	UPDATE [dbo].[Vehiculos] SET IdUbicacion = @IdUbicacionRecogida
END
GO
/****** Object:  StoredProcedure [dbo].[InsertarUbicacion]    Script Date: 26/02/2024 3:06:19 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[InsertarUbicacion]
	@Ubicacion Varchar(150),
	@Estado Bit
AS
BEGIN
	INSERT INTO [dbo].[Ubicaciones]
           ([Ubicacion]
           ,[Estado])
     VALUES
           (@Ubicacion,
           @Estado)
END
GO
/****** Object:  StoredProcedure [dbo].[ListadoEstadoVehiculo]    Script Date: 26/02/2024 3:06:19 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[ListadoEstadoVehiculo]
	@IdUbicacionRecogida int = 0,
	@IdUbicacionDevolucion int = 0
AS
BEGIN
	SELECT A.Id,
		 B.Referencia,
		 C.Ubicacion AS UbicacionRecogida,
		 D.Ubicacion AS UbicacionDevolucion,
		 A.Estado,
		 B.Disponible
	FROM [dbo].[EstadoVehiculo] A
	INNER JOIN [dbo].[Vehiculos] B On B.Id = A.IdVehiculo
	LEFT JOIN [dbo].[Ubicaciones] C On C.Id = A.IdUbicacionRecogida
	LEFT JOIN [dbo].[Ubicaciones] D On D.Id = A.IdUbicacionDevolucion
	WHERE ((@IdUbicacionRecogida = 0 OR A.IdUbicacionRecogida = @IdUbicacionRecogida) AND (@IdUbicacionDevolucion = 0 OR A.IdUbicacionDevolucion = @IdUbicacionDevolucion))
END
GO
/****** Object:  StoredProcedure [dbo].[ListadoUbicaciones]    Script Date: 26/02/2024 3:06:19 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[ListadoUbicaciones]
	
AS
BEGIN
	SELECT [Id]
      ,[Ubicacion]
      ,[Estado]
  FROM [dbo].[Ubicaciones]
END
GO
/****** Object:  StoredProcedure [dbo].[ValidarVehiculos]    Script Date: 26/02/2024 3:06:19 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[ValidarVehiculos] 
	
AS
BEGIN
	SELECT  A.Id,
		A.Referencia,
		A.IdUbicacion,
		A.Disponible,
		B.Ubicacion
	FROM [dbo].[Vehiculos]  A
	INNER JOIN [dbo].[Ubicaciones] B ON B.Id =  A.[IdUbicacion]
END
GO
