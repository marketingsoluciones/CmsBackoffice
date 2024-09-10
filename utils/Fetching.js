import { api } from "../utils/api";

export const fetchApi = async ({
  query = ``,
  variables = {},
  type = "json",
  development
}) => {
  if (query) {
    // Determinar si se usara json o form data

    //JSON
    if (type === "json") {
      const {
        data: { data },
      } = await api.ApiBodas({ query, variables }, development);
      return Object.values(data)[0]

      //Form data
    } else if (type === "formData") {
      const formData = new FormData();
      const values = Object?.entries(variables);

      // Generar el map del Form Data para las imagenes
      const map = values?.reduce((acc, item) => {
        if (item[1] instanceof File) {
          acc[item[0]] = [`variables.${item[0]}`];
        }
        if (item[1] instanceof Object) {
          Object.entries(item[1]).forEach((el) => {
            if (el[1] instanceof File) {
              acc[el[0]] = [`variables.${item[0]}.${el[0]}`];
            }
            if (el[1] instanceof Object) {
              Object.entries(el[1]).forEach((elemento) => {
                if (elemento[1] instanceof File) {
                  acc[elemento[0]] = [
                    `variables.${item[0]}.${el[0]}.${elemento[0]}`,
                  ];
                }
              });
            }
          });
        }
        return acc;
      }, {});

      // Agregar filas al FORM DATA

      formData.append("operations", JSON.stringify({ query, variables }));
      formData.append("map", JSON.stringify(map));
      values.forEach((item) => {
        if (item[1] instanceof File) {
          formData.append(item[0], item[1]);
        }
        if (item[1] instanceof Object) {
          Object.entries(item[1]).forEach((el) => {
            if (el[1] instanceof File) {
              formData.append(el[0], el[1]);
            }
            if (el[1] instanceof Object) {
              Object.entries(el[1]).forEach((elemento) => {
                if (elemento[1] instanceof File) {
                  formData.append(elemento[0], elemento[1]);
                }
              });
            }
          });
        }
      });

      const {
        data: { data },
      } = await api.ApiBodas(formData, development, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return Object.values(data)[0]
    }

  };
}

export const fetchApiEventos = async ({ query, variables, domain }) => {
  const {
    data: { data },
  } = await api.ApiApp({ query, variables }, domain);
  return Object.values(data)[0];
};

export const queries = {
  getWhiteLabel: `query($userUid:String){
    getWhiteLabel(userUid:$userUid){
      _id
      name
      whiteLabelDomain
      pathDirectory
      favicon
      logoDirectory
      headTitle
      primaryColor
      secondaryColor
      tertiaryColor
      baseColor
      status
      userUid
      authorUsername
      createdAt
      updatedAt
    }
  }`,
  createWhiteLabel: `mutation($args:inputWhiteLabel){
    createWhiteLabel(args:$args){
      _id
      name
      whiteLabelDomain
      pathDirectory
      favicon
      logoDirectory
      headTitle
      primaryColor
      secondaryColor
      tertiaryColor
      baseColor
      status
      userUid
      authorUsername
      createdAt
      updatedAt
    }
  }`,
  updateWhiteLabels: `mutation($args:inputWhiteLabel){
    updateWhiteLabels(args:$args)
  }`,
  createLink: `mutation($args:inputLink){
    createLink(args:$args){
      _id
      ownerUid
      title
      socialMedia
      link
    }
  }`,
  getLinks: `query($development:String){
    getLinks(development:$development){
      total
      results{
        _id
        development
        ownerUid
        title
        socialMedia
        link
        createdAt
        updatedAt
      }
    }
  }`,
  getActivityLink: `query($link_id:ID){
    getActivityLink(link_id:$link_id){
      total
      results{
        _id
        link_id
        link
        storage_id
        usuario_id
        name
        role
        email
        phoneNumber
        referer
        acceptLanguage
        loop
        connectingIp
        ipcountry
        navigator
        mobile
        localStorageId
        accessed{
          count
          accessedAt
        }
        preregistered{
          count
          accessedAt
        }
        registered{
          count
          accessedAt
        }
        logged{
          count
          accessedAt
        }
        logoutd{
          count
          accessedAt
        }
        usedAt
      }
    }
  }`,
  getN8n: `query
  {
    getN8n
  }`,

  singleUpload: `mutation($file:Upload!,$use:String)
  {
    singleUpload(file:$file,use:$use){
      _id
      i800
    }
  }`,

  createCodePage: `mutation ($args:[inputCodePage]){
    createCodePage(args:$args){
      total
      results{
        _id
        title
        description
        author{
          _id
          uid
          email
          displayName
          photoURL
        }
        code
        assets
        pages
        styles
        symbols
        type
        price
        status
        createdAt
        updatedAt
      }
    }
  }`,

  updateCodePage: `mutation ($args:inputCodePage){
    updateCodePage(args:$args){
      _id
       title
        description
        author{
          _id
          uid
          email
          displayName
          photoURL
        }
        code
        assets
        pages
        styles
        symbols
        type
        price
        status
        createdAt
        updatedAt
      }
    }`,

  getCodePage: `query ($args:inputCodePage, $sort:sortCriteriaCodePage, $skip:Int, $limit:Int){
    getCodePage(args:$args, sort:$sort, skip:$skip, limit:$limit){
      total
      results{
        _id
        title
        description
        author{
          _id
          uid
          email
          displayName
          photoURL
        }
        code
        assets
        pages
        styles
        symbols
        type
        price
        state
        status
        createdAt
        updatedAt
      }
    }
  }`,

  signOut: `mutation ($sessionCookie :String){
    signOut(sessionCookie:$sessionCookie)
  }`,
  getAllProducts: `query ($grupo:String) {
    getAllProducts(grupo:$grupo){
      currency
      total
      results{
        id
        name
        description
        images
        usage
        subscriptionId
        current_period_start
        current_period_end
        prices{
          id
          currency
          unit_amount
          recurring{
            interval
            trial_period_days
          }
        }
        metadata{
          grupo
          includes
          segmento
          tipo
        }
      }
    }
  }`,
  createCheckoutSession: `mutation ($items:[inputItemsCheckout], $email:String, $cancel_url:String, $mode:String, $success_url:String){
    createCheckoutSession(items:$items, email:$email, cancel_url:$cancel_url, mode:$mode, success_url:$success_url)
  }`,
  getGeoInfo: `query  {
    getGeoInfo {
      referer
      acceptLanguage
      loop
      connectingIp
      ipcountry
    }
  }`,
  updateMetricol: `mutation($uid: ID!){
    updateMetricol(uid:$uid){
      userId
      blogId
      whiteLabelLink
      analyticModeWhitelabelLink
    }
  }`,
  getUser: `query ($uid: ID) {
        getUser(uid:$uid){
          phoneNumber
          role
          typeRole
          city
          country
          weddingDate
          signUpProgress
          status
          visibleColumns {
            accessor
            show
          }
          authDevelopments {
            title
            role
            status
            metricol {
              userId
              blogId
              whiteLabelLink
              analyticModeWhitelabelLink
          }
            nickNames{
              _id
              nickName
              socialMedia{
                title
                link
                isVisible
              }
              comment
              trackbacks
              imgAvatar{
                i320
                i640
              }
              createdAt
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`,
  authStatus: `mutation ($sessionCookie : String){
        status(sessionCookie: $sessionCookie){
          customToken
        }
      }`,
  editTask: `mutation ($eventID:String, $itinerarioID:String, $taskID:String, $variable:String, $valor:String){
        editTask(eventID:$eventID itinerarioID:$itinerarioID  taskID:$taskID  variable:$variable  valor:$valor )
      }`,

  createTask: `mutation ($eventID:String, $itinerarioID:String, $hora:String, $duracion:Int){
        createTask(eventID:$eventID itinerarioID:$itinerarioID  hora:$hora, duracion:$duracion ){
          _id
          hora
          icon
          descripcion
          responsable
          duracion
          tips
          estatus
          fecha_creacion
        }
      }`,

  deleteTask: `
  mutation  ( $eventID:String, $itinerarioID:String, $taskID:String  ) {
    deleteTask ( eventID:$eventID  itinerarioID:$itinerarioID  taskID:$taskID)
  }`,

  createItinerario: `mutation ($eventID:String, $title:String){
        createItinerario(eventID:$eventID title:$title ){
          _id
          title
          tasks{
            _id
            hora
            duracion
          }
        }
      }`,

  deleteItinerario: `
  mutation  ( $eventID:String, $itinerarioID:String ) {
    deleteItinerario ( eventID:$eventID  itinerarioID:$itinerarioID  )
  }`,

  getItinerario: ` query($evento_id:String, $itinario_id: String){
    getItinerario(evento_id:$evento_id, itinario_id:$itinario_id){
      total
      response{
        _id
        title
        tasks
        estatus
        fecha_creacion
      }
    }
  }`,

  createNickName: `
  mutation  (
    $uid : ID!,
    $nickName: String!, 
    $imgAvatar:Upload, 
    $socialMedia:[inputSocialMedia]
    $development:String!
  ) {
    createNickName (args:{uid:$uid, nickName: $nickName, imgAvatar:$imgAvatar, socialMedia:$socialMedia, development:$development }){
      _id
      nickName
      socialMedia{
        title
        link
        isVisible
      }
      comment
      trackbacks
      imgAvatar{
        i320
        i640
      }
      createdAt
      updatedAt
    }
  }`,
  updateNickName: `
  mutation  (
    $uid : ID!,
    $nickName: String!, 
    $imgAvatar:Upload, 
    $socialMedia:[inputSocialMedia]
    $development:String!
  ) {
    updateNickName (args:{uid:$uid, nickName: $nickName, imgAvatar:$imgAvatar, socialMedia:$socialMedia, development:$development }){
        _id
        nickName
        socialMedia{
          title
          link
          isVisible
        }
        comment
        trackbacks
        imgAvatar{
          i320
          i640
        }
        createdAt
        updatedAt
      }
    }`,
  deleteNickName: `
  mutation  ($uid:ID!, $nickName:String!, $development:String!) {
    deleteNickName (uid:$uid, nickName:$nickName, development:$development)
  }`,
  updateVisibleColumns: `
    mutation  ($uid : ID!, $args:[inputVisibleColumn]) {
      updateVisibleColumns (uid:$uid, args:$args){
        accessor
        show
      }
        }`,
  eventCreate: `mutation (
    $nombre: String,
    $tipo: String!,
    $fecha: String,
    $pais: String,
    $poblacion: String,
    $usuario_id: String!
    $usuario_nombre: String!
  ){
    crearEvento(
      nombre: $nombre,
      tipo: $tipo,
      fecha: $fecha,
      pais: $pais,
      poblacion: $poblacion,
      usuario_id: $usuario_id,
      usuario_nombre: $usuario_nombre
    ){
      _id
      grupos_array
      estatus
      nombre
      fecha_actualizacion
      fecha_creacion
      tipo
      usuario_id
      usuario_nombre
      fecha
      poblacion
      pais
      notificaciones_array{
        _id
        fecha_creacion
        fecha_lectura
        mensaje
      }
      planSpaceSelect
      planSpace{
      _id
      title
      size{
        width
        height
      }
      spaceChairs
      template
      sections{
        _id
        title
        position{
          x
          y
        }
        size{
          width
          height
        }
        color
        elements{
          _id
          title
          rotation
          position{
            x
            y
          }
          size{
            width
            height
          }
        }
        tables{
          _id
          title
          rotation
          position{
            x
            y
          }
          size{
            width
            height
          }
          tipo
          numberChair
          guests{
            _id
            chair
            order
          }
        }
      }
      elements{
        _id
        title
        rotation
        position{
          x
          y
        }
        size{
          width
          height
        }
        tipo
      }
      tables{
        _id
        title
        rotation
        position{
          x
          y
        }
        size{
          width
          height
        }
        tipo
        numberChair
        guests{
          _id
          chair
          order
        }
      }
    }
      mesas_array{
            _id
            nombre_mesa
            tipo
            cantidad_sillas
            posicion {
              x
              y
            }
      }
      invitados_array{
        _id
        nombre
        grupo_edad
        correo
        telefono
        nombre_mesa
        puesto
        asistencia
        nombre_menu
        rol
        correo
        sexo
        movil
        poblacion
        pais
        direccion
      }
      menus_array{
        nombre_menu
        tipo
      }
      presupuesto_objeto{
        coste_final
        pagado
        coste_estimado
        categorias_array{
          _id
          nombre
          coste_estimado
          coste_final
          pagado
          gastos_array {
            _id
            coste_estimado
            coste_final
            pagado
            nombre
            pagos_array {
              _id
              estado
              fecha_creacion
              fecha_pago
              fecha_vencimiento
              medio_pago
              importe
            }
          }
          
        }
      }
    }
  }`,
  getEventsByID: `query SolicitarEventos($userID : String, $development: String!) {
    queryenEvento(valor: $userID, development: $development){
      _id
      grupos_array
      estatus
      color
      temporada
      estilo
      tematica
      tarta
      nombre
      fecha_actualizacion
      fecha_creacion
      tipo
      usuario_id
      usuario_nombre
      fecha
      listaRegalos
      poblacion
      pais
      imgInvitacion{
        _id
        i1024
        i800
        i640
        i320
        createdAt
      }
      notificaciones_array{
        _id
        fecha_creacion
        fecha_lectura
        mensaje
      }
      itinerarios_array{
        _id
        title
        tasks{
          _id
          hora
          icon
          descripcion
          responsable
          duracion
          tips
          estatus
        }
        estatus
      }
      planSpaceSelect
      planSpace{
      _id
      title
      size{
        width
        height
      }
      spaceChairs
      template
      sections{
        _id
        title
        position{
          x
          y
        }
        size{
          width
          height
        }
        color
        elements{
          _id
          title
          rotation
          position{
            x
            y
          }
          size{
            width
            height
          }
        }
        tables{
          _id
          title
          rotation
          position{
            x
            y
          }
          size{
            width
            height
          }
          tipo
          numberChair
          guests{
            _id
            chair
            order
          }
        }
      }
      elements{
        _id
        title
        rotation
        position{
          x
          y
        }
        size{
          width
          height
        }
        tipo
      }
      tables{
        _id
        title
        rotation
        position{
          x
          y
        }
        size{
          width
          height
        }
        tipo
        numberChair
        guests{
          _id
          chair
          order
        }
      }
    }
      mesas_array{
           _id
           nombre_mesa
           tipo
           cantidad_sillas
           posicion {
             x
             y
           }
      }
      invitados_array{
        _id
        nombre
        grupo_edad
        correo
        telefono
        chairs{
          planSpaceID
          sectionID
          tableID
          position
          order
        }
        nombre_mesa
        puesto
        asistencia
        nombre_menu
        rol
        correo
        sexo
        movil
        poblacion
        pais
        direccion
        invitacion
      }
      menus_array{
        nombre_menu
        tipo
      }
      presupuesto_objeto{
       coste_final
       pagado
       coste_estimado
       categorias_array{
         _id
         nombre
         coste_estimado
         coste_final
         pagado
         gastos_array {
           _id
           coste_estimado
           coste_final
           pagado
           nombre
           pagos_array {
             _id
             estado
             fecha_creacion
             fecha_pago
             fecha_vencimiento
             medio_pago
             importe
             pagado_por
           }
         }
         
       }
     }
    }
  }`,
  eventDelete: `mutation ($eventoID : String!) {
          borrarEvento(evento_id:$eventoID){
            modificado
          }
        }`,
  eventUpdate: `mutation ($idEvento: String!, $variable:String, $value : String){
          editEvento(
            evento_id: $idEvento, 
            variable_reemplazar: $variable, 
            valor_reemplazar: $value
            ){
            _id
          }
        }`,
  createGuests: `mutation ($eventID: String, $guestsArray : [invitAinput]) {
          creaInvitado(evento_id: $eventID, invitados_array: $guestsArray){
           invitados_array{
             _id
             nombre
             grupo_edad
             correo
             telefono
             nombre_mesa
             nombre_menu
             puesto
             asistencia
             rol
             correo
             sexo
             invitacion
           }
         }
         }`,
  editGuests: `mutation ($eventID:String, $guestID:String, $variable: String, $value:String) {
          editInvitado(
            evento_id:$eventID, 
            invitado_id:$guestID, 
            variable_reemplazar:$variable,
            valor_reemplazar:$value){
              _id
              nombre
              grupo_edad
              correo
              telefono
              nombre_mesa
              puesto
              asistencia
              nombre_menu
              rol
              correo
              sexo
              movil
              poblacion
              pais
              direccion
            }
          }`,
  removeGuests: `mutation ($eventID:String, $guests: [String]){
          borraInvitados(evento_id:$eventID,
          invitados_ids_array:$guests){
            invitados_array{
              _id
              nombre
              sexo
              grupo_edad
              correo
              telefono
              nombre_mesa
              puesto
              asistencia
              rol
            }
          }
        }`,
  createGroup: `mutation ($eventID: String, $name: String) {
          creaGrupo(evento_id:$eventID, nombre_grupo: $name){
            grupos_array
          }
        }`,
  createMenu: `mutation ($eventID: String, $name: String) {
          creaMenu(evento_id:$eventID, nombre_menu: $name){
            menus_array{
              nombre_menu
              tipo
            }
          }
        }`,
  deleteMenu: `mutation ($eventID: String, $name: String) {
          borraMenu(evento_id:$eventID, nombre_menu: $name){
            menus_array{
              nombre_menu
              tipo
            }
          }
        }`,
}

export const FetchGraphQL = {
  //ENDPOINTS DE EMPRESAS
  business: {
    // @READ Buscar todos los listing


    getBusinessAll: {
      query: `query($development: String!, $userUid: ID, $skip: Int, $limit: Int, $sort: sortCriteriaBusiness) {
              getAllBusinesses(development:$development, searchCriteria:{userUid:$userUid}, skip:$skip, limit:$limit, sort:$sort){
                total
                results{
                  _id
                  businessName
                  slug
                  createdAt
                  updatedAt
                  contactName
                  status
                  userUid
                  contactName
                  imgMiniatura{
                    i320
                  }
                }
              }
            }`
    },

    // @READ Buscar según ID
    getOneBusiness: {
      query: `query ($id: ID, $slug : String) {
        getOneBusiness(_id: $id, slug: $slug){
          _id
          slug
          tags
          contactName
          contactEmail
          coordinates {
            type
            coordinates
          }
          businessName
          webPage
          landline
          mobilePhone
          whatsapp
          twitter
          facebook
          linkedin
          youtube
          instagram
          country
          city
          zip
          address
          description
          content
          status
          subCategories{
            _id
          }
          questionsAndAnswers{
            questions{
              _id
              title
            }
            answers
          }
          categories{
            _id
          }
          subCategories{
            _id
          }
          imgMiniatura{
            _id
            i1024
            i800
            i640
            i320
          }
          imgLogo{
            _id
            i1024
            i800
            i640
            i320
          }
          status
          createdAt
          updatedAt
          characteristics{
            characteristic{
              _id
              title
              items{
                _id
                title
              }
            }
            items{
              _id
              title
            }
            
          }
          imgCarrusel {
            _id
            i1024
            i800
            i640
            i320
          }
        }
      }`,
    },

    // @READ Buscar según ID
    getBusinessByID: {
      query: `query ($id: ID) {
        getBussines(id: $id){
          _id
          userUid
          slug
          businessName
          content
          imgMiniatura{
            _id
            smallUrl
          }
        }
      }`,
    },

    // @CREATE Crear empresa
    createBusiness: {
      query: `mutation (
        $id : ID
        $slug: String
        $userUid: ID
        $tags : [String]
        $contactName: String
        $contactEmail: String
        $businessName:String
        $webPage : String,
        $landline: String
        $mobilePhone : String
        $whatsapp : String
        $twitter : String
        $facebook : String
        $linkedin : String
        $youtube : String
        $instagram : String
        $country : String
        $city : String
        $zip : String
        $address : String
        $description : String
        $content : String
        $coordinates : inputCoordinate
        $subCategories : [inputObjectID]
        $questionsAndAnswers : [inputQuestionsAndAnswers]
        $characteristics : [inputCharacteristicsCms]
        $business_hours :inputDias
        $imgCarrusel : [Upload]
        $imgMiniatura : Upload
        $imgLogo : Upload
        $status: Boolean
        $development: String!
      ){
        createBusinessCms(id: $id, args: {
          slug: $slug
          userUid: $userUid
          tags : $tags
          contactName: $contactName
          contactEmail: $contactEmail
          businessName: $businessName
          webPage: $webPage
          landline: $landline
          mobilePhone: $mobilePhone
          whatsapp :$whatsapp
          twitter: $twitter
          facebook : $facebook
          linkedin : $linkedin
          youtube : $youtube
          instagram : $instagram
          country : $country
          city : $city
          zip : $zip
          address : $address
          description : $description
          content : $content
          coordinates : $coordinates
          subCategories: $subCategories
          questionsAndAnswers : $questionsAndAnswers
          characteristics: $characteristics
          business_hours: $business_hours
          imgCarrusel: $imgCarrusel
          imgMiniatura : $imgMiniatura
          imgLogo: $imgLogo
          status: $status
        }development: $development ){
          _id
           
        }
      }`
    },

    // @UPDATE Actualizar empresa
    updateBusiness: {
      query: `mutation ($id :ID, $args: inputBusiness) {
        updateBusinessCms(_id: $id, args: $args){
           _id
        }
      }`
    },

    // @DELETE Borrar empresa
    deleteBusiness: {
      query: `mutation ($id : [ID]){
        deleteBusinesses(id: $id)
      }`
    }
  },
  //ENDPOINTS DE CATEGORIAS DE LISTING
  catBusiness: {
    // @READ Buscar todas las categorias
    getCategoryBusiness: {
      query: `query ($development: String!){
        getCategoryBusiness (development: $development){
          total
          results{
            _id
          title
          heading
          slug
          description
          createdAt
          updatedAt
          imgMiniatura{
            i320
          }
          }
        }
      }`,
      variables: {},
    },

    // @READ Buscar categoria segun ID
    getOneCategoryBusiness: {
      query: `query ($id: ID){
        getOneCategoryBusiness(_id: $id){
          _id
          title
          heading
          slug
          description
          imgMiniatura{
            _id
            i1024
            i800
            i640
            i320
          }
          imgBanner{
            _id
            i1024
            i800
            i640
            i320
          }
          icon{
            _id
            i1024
            i800
            i640
            i320
          }
          subCategories{
            _id
          }
          createdAt
          updatedAt
        }
      }`,
    },

    // @CREATE Crear nueva categoria
    createCategoryBusiness: {
      query: `mutation (
        $title: String,
        $heading :String,
        $slug: String,
        $description: String,
        $subCategories: [ID],
        $imgBanner : Upload
        $imgMiniatura : Upload
        $icon : Upload,
        $development: String!
      ) {
        createCategoryBusiness(args: {
          title: $title,
          heading: $heading,
          slug: $slug,
          description: $description,
          subCategories: $subCategories,
          imgBanner : $imgBanner
          imgMiniatura : $imgMiniatura
          icon : $icon
        },
        development: $development){
          _id
          title
        }
      }`,
    },

    // @DELETE Eliminar categoria
    deleteCategoryBusiness: {
      query: `mutation ($id: [ID]) {
        deleteCategoryBusiness(_id: $id)
      }`,
    },

    // @UPDATE Actualizar categoria
    updateCategoryBusiness: {
      query: `mutation ($id : ID, $args : inputCategoryBusiness) {
        updateCategoryBusiness(_id: $id, args: $args){
          _id
          title
          heading
          slug
          description
          createdAt
          updatedAt
          subCategories{
            _id
          }
        }
      }`,
    },
  },
  //ENDPOINTS DE SUB-CATEGORIAS DE LISTING
  subCatBusiness: {
    // @READ Buscar todos los registros
    getSubCategoryBusiness: {
      query: `query($development: String!){
        getSubCategoryBusiness(development:$development){
          total
          results{
            _id
            title
            heading
            slug
            description
            imgMiniatura{
              i320
            }
            createdAt
            updatedAt
          }
        }
      }`,
      variables: {},
    },

    // @READ Buscar subcategoria segun ID
    getOneSubCategoryBusiness: {
      query: `query ($id: ID){
        getOneSubCategoryBusiness(_id: $id){
          _id
          title
          heading
          slug
          description
          imgMiniatura{
            _id
            i1024
            i800
            i640
            i320
            createdAt
          }
          imgBanner{
            _id
            i1024
            i800
            i640
            i320
            createdAt
          }
          icon{
            _id
            i1024
            i800
            i640
            i320
            createdAt
          }
          characteristics{
            _id
          }
          questions{
            _id
          }
          createdAt
          updatedAt
        }
      }`,
    },

    //@CREATE Crear sub Categoria
    createSubCategoryBusiness: {
      query: `mutation (
        $title: String,
        $heading :String,
        $slug: String,
        $description: String,
        $development: String!
      ) {
        createSubCategoryBusiness(args: {
          title: $title,
          heading: $heading,
          slug: $slug,
          description: $description,
        },
        development:$development){
          _id
          title
          heading
          slug
          description
        }
      }`,
    },

    //@DELETE eliminar sub categoria
    deleteSubCategoryBusiness: {
      query: `mutation ($id: [ID]) {
        deleteSubCategoryBusiness(_id: $id)
      }`,
    },

    // @UPDATE Actualizar sub categoria
    updateSubCategoryBusiness: {
      query: `mutation ($id : ID, $args : inputSubCategoryBusiness) {
        updateSubCategoryBusiness(_id: $id, args: $args){
          _id
          title
          questions{
            _id
          }
        }
      }`,
    },
  },

  //ENDPOINTS DE CARACTERISTICAS DE LISTING
  characteristics: {
    // @READ Buscar todos los registros
    getAllCharacteristics: {
      query: `query ($development: String!) {
        getCharacteristics(development: $development){
          total
          results{
            _id
            title
            icon{
              _id
            }
            items{
              _id
              title
              createdAt
              updatedAt
              icon{
                _id
              }
            }
          }
        }
      }`,
      variables: {},
    },
    // @READ Buscar caracteristica segun ID
    getOneCharacteristics: {
      query: `query ($id: ID) {
        getOneCharacteristics(_idCharacteristics:$id){
            _id
            title
            icon{
              _id
            }
            items{
              title
            }
          }
      }`,
    },
    //@CREATE create caracteristicas
    createCharacteristics: {
      query: `mutation ($title: String, $icon : Upload, $items : [inputCharacteristicsItems], $development: String! ){
        createCharacteristics(args:{title: $title, icon : $icon, items: $items }, development: $development){
          _id
        }
      }`,
    },
    //@DELETE eliminar caracteristica
    deleteCharacteristics: {
      //revisar
      query: `mutation ($id: [ID]) {
        deleteCharacteristics(_idCharacteristic: $id)
      }`,
    },
    updateCharacteristics: {
      query: `mutation ($id :ID, $args : inputCharacteristics) {
        updateCharacteristics(_id: $id, args: $args){
          _id
          title
        }
      }`,
    },
  },

  //ENDPOINTS DE PREGUNTAS FRECUENTES
  questions: {
    // @READ Buscar todas las preguntas
    getAllQuestions: {
      query: `query($development: String!) {
      getQuestions(development: $development){
        total
        results{
          _id
          title
          createdAt
          updatedAt
        }
      }
    }`,
      variables: {},
    },

    // @READ Buscar pregunta segun ID
    getOneQuestion: {
      query: `query ($id: ID){
      getOneQuestions(_idQuestions: $id){
          _id
          title
          createdAt
          updatedAt
    
      }
    }`,
    },

    //@CREATE Create question
    createQuestions: {
      //revisar... error por no aceptar null
      query: `mutation (
        $title: String,
        $development: String!
        ){
        createQuestions(title: $title, development: $development){
          _id
          title
        }
      }`,
    },

    //@DELETE borrar questions
    deleteQuestions: {
      //revisar
      query: `mutation ($id: [ID]) {
        deleteQuestions(_idQuestions: $id)
      }`,
    },

    //@UPDATE Actualizar pregunta
    updateQuestions: {
      query: `mutation ($id:ID!, $args : inputQuestions){
        updateQuestions(_id: $id, args :$args){
          _id
          title
          createdAt
          updatedAt
        }
      }`,
    },
  },

  //ENDPOINTS DE POSTS
  posts: {
    // @READ Buscar todos los posts
    getAllPost: {
      query: `query($development: String!, $authorUid:String, $skip: Int, $limit: Int, $sort: sortCriteriaPost){
        getAllPost(
          development: $development, 
          searchCriteria:{
            authorUid:$authorUid
          }
           skip:$skip, limit:$limit, sort:$sort
        ){
          total
          results{
            _id
            title
            subTitle
            slug
            createdAt
            updatedAt
            status
            views
            imgMiniatura{
              _id
              i1024
              i800
              i640
              i320
            }
          }
        }
      }`
    },

    // @READ Buscar post por ID
    getOnePost: {
      query: `query ($id :ID) {
        getOnePost(_id:$id){
          _id
          title
          subTitle
          content
          slug
          seoDescription
          subCategories{
            _id
          }
          imgCarrusel{
            _id
            i1024
            i800
            i640
            i320
          }
          imgMiniatura{
            _id
            i1024
            i800
            i640
            i320
            videoUrl
          }
          video{
            url
          }
          authorUsername
          updaterUsername
          status
          tags
          createdAt
          updatedAt
        }
      }`
    },

    // @CREATE Crear post
    createPost: {
      query: `mutation (
        $title: String,
        $subTitle :String,
        $content: String,
        $slug : String,
        $seoDescription : String,
        $subCategories: [ID],
        $tags :[String],
        $authorUid: String,
        $authorUsername :String,
        $imgCarrusel : [Upload],
        $imgMiniatura : Upload,
        $video: Upload,
        $development: String!
      ){
        createPost (args:{
          title: $title,
          subTitle:$subTitle,
          content: $content,
          slug:$slug,
          seoDescription: $seoDescription,
          subCategories :$subCategories,
          tags: $tags,
          authorUid:$authorUid,
          authorUsername :$authorUsername,
          imgCarrusel: $imgCarrusel,
          imgMiniatura : $imgMiniatura,
          video: $video
        },
        development: $development){
          _id
        }
      }`
    },

    // @DELETE Eliminar post
    deletePost: {
      query: `mutation ($id :[ID]){
        deletePost(_id: $id)
      }`
    },

    // @UPDATE Actualizar post
    updatePost: {
      query: `mutation ($id :ID, $args : inputPost){
        updatePost(_id: $id, args:$args){
          _id
        }
      }`
    },

  },

  //ENDPOINTS DE CATEGORIAS DE POSTS
  categoryPost: {
    // @READ Buscar todas las categorias
    getAllCategoryPost: {
      query: `query ($development: String!){
        getCategoryPost(development: $development){
          total
          results{
            _id
            title
            heading
            slug
            description
            createdAt
            updatedAt
            imgMiniatura{
              i320
            }
          }
        }
      }`,
    },

    // @READ Buscar categoria segun ID
    getOneCategoryPost: {
      query: `query ($id :ID){
        getOneCategoryPost(_id: $id){
          _id
          title
          heading
          slug
          description
          imgMiniatura{
            _id
            i1024
            i800
            i640
            i320
          }
          imgBanner{
            _id
            i1024
            i800
            i640
            i320
          }
          icon{
            _id
            i1024
            i800
            i640
            i320
          }
          subCategories{
            _id
          }
        }
      }`,
    },

    //@CREATE Crear categoria
    createCategoryPost: {
      query: `mutation ($development: String! ,$title:String, $heading: String, $slug : String, $description: String, $imgMiniatura : Upload, $imgBanner :Upload, $icon: Upload, $subCategories: [ID] ) {
        createCategoryPost(args: {
          title: $title,
          heading: $heading,
          slug: $slug,
          description: $description,
          imgMiniatura: $imgMiniatura,
          imgBanner: $imgBanner,
          icon: $icon,
          subCategories: $subCategories
        }development:$development){
          _id
        }
      }`
    },

    updateCategoryPost: {
      query: `mutation ($id :ID, $args: inputCategoryPost ) {
        updateCategoryPost(_id: $id, args: $args){
          _id
        }
      }`
    },
    deleteCategoryPost: {
      query: `mutation ($id : [ID]) {
        deleteCategoryPost(_id: $id)
      }`
    }
  },

  //ENDPOINTS DE SUB-CATEGORIAS DE POSTS
  subCategoryPost: {
    // @READ Buscar todas las subcategorias
    getAllSubCategoryPost: {
      query: `query ($development: String!) {
        getSubCategoryPost(development: $development){
          total
          results{
            _id
            title
            heading
            slug
            description
            createdAt
            updatedAt
            imgMiniatura{
              i320
            }
          }
        }
      }`,
    },

    // @READ Buscar subcategoria segun ID
    getOneSubCategoryPost: {
      query: `query ($id:ID) {
        getOneSubCategoryPost(_id :$id){
            _id
            title
            heading
            slug
            description
            imgMiniatura{
              _id
              i1024
              i800
              i640
              i320
            }
            imgBanner{
              _id
              i1024
              i800
              i640
              i320
            }
            icon{
              _id
              i1024
              i800
              i640
              i320
            }
            createdAt
            updatedAt
        }
      }`,
    },

    // @CREATE Crear subcategoria
    createSubCategoryPost: {
      query: `mutation ($development:String!, $title :String, $heading :String, $slug:String, $description: String, $imgMiniatura: Upload, $imgBanner :Upload, $icon :Upload ){
        createSubCategoryPost(args:{
          title :$title,
          heading: $heading,
          slug: $slug,
          description: $description,
          imgMiniatura : $imgMiniatura,
          imgBanner : $imgBanner,
          icon : $icon
        }development:$development){
          _id
        }
      }`
    },
    //@UPDATE Actualizar subcategoria
    updateSubCategoryPost: {
      query: `mutation ($id: ID, $args :inputSubCategoryPost ){
        updateSubCategoryPost(_id: $id, args: $args){
          _id
        }
      }`
    },

    deleteSubCategoryPost: {
      query: `mutation ($id:[ID]) {
        deleteSubCategoryPost(_id: $id)
      }`
    },
  },

  //ENDPOINTS PARA CREAR PAGINAS DE POLITICAS
  sections: {

    getAllPage: {
      query: `query($development: String!){
        getAllPage(development: $development){
          total
          results{
            _id
            title
            subTitle
            slug
            content
            status
            authorUsername
            createdAt
            updatedAt
          }
        }
      }`
    },

    getOnePage: {
      query: `query($id:ID) {
        getOnePage(_id:$id){
          _id
          title
          subTitle
          slug
          content
          status
          authorUsername
          createdAt
          updatedAt
        }
      }`
    },

    createPage: {
      query: `mutation ($title: String,  $content:String, $status:Boolean, $authorUsername:String){
        createPage(args:{
        title: $title,
        subTitle: $subTitle,
        content: $content,
        status: $status,
        authorUsername: $authorUsername,
      }){
         _id
        }
      }`
    },

    updatePage: {
      query: `mutation($id: ID, $args: inputPage){
        updatePage(_id:$id ,args:$args)
        {
          _id
        }
      }`
    },

    deletePage: {
      query: `mutation ($id:[ID]){
        deletePage(_id: $id)
      }`
    },
  }
};

export const FetchAPP = {
  eventos: {
    createEvento: {

    }
  }
}