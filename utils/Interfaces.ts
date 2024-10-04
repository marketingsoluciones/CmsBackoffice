export interface DataComponents {
    title: string
    slug: string
    icon: JSX.Element
    component: JSX.Element
}

export interface Factura {
    _id: string
    id_factura: string
    fecha_pago: Date
    scanedFacturas: Date
    scanedFacturasTotal: number
    fecha_pago_ref: string
    total_cobrado: number
    referencia: string
    forma_pagoID: number
    forma_pago: String
    cajeroID: number
    cajero: String
    pagado: boolean
    recargado: boolean
    criterio: string
    monto_facturas: number
    diferencia: number
    createdAt: Date
    updatedAt: Date
}

export interface Prospectos {
    _id: string
    prospecto: string
    fecha: Date
    createdAt: Date
    updatedAt: Date
}

export interface Event {
    _id: string
    fecha_creacion: string
    estatus: string
    fecha_actualizacion: string
    tipo: string
    nombre: string
    usuario_id: string
    usuario_nombre: string
    nonce: string
    fecha: string
    poblacion: string
    pais: string
    cant_invitados: number
    invitados_array: guests[]
    menus_array: menu[]
    planSpaceSelect: string
    planSpace: planSpace[]
    mesas_array: tableOld[]
    grupos_array: string[]
    notificaciones_array: notification[]
    imgInvitacion: image
    presupuesto_objeto: estimate
    listaRegalos: string
}

export interface tableOld {
    _id: string
    nombre_mesa: string
    tipo: string
    posicion: {
        x: number
        y: number
    }
    cantidad_sillas: number
}
interface chair {
    planSpaceID: string,
    sectionID: string,
    tableID: string,
    position: number,
    order: string
}

export interface position {
    x: number
    y: number
}

export interface size {
    width: number
    height: number
}

interface propsBase {
    _id?: string
    title: string
    rotation: number
    position: position
    size: size
}
export interface element extends propsBase {
    tipo: string
}

interface section extends propsBase {
    color: string
    elements: element[]
    tables: table[]
}
export interface guest {
    _id: string,
    chair: number,
    order: Date
}

export interface table extends element {
    numberChair: number
    guests: guest[]
}

export interface planSpace {
    _id: string
    title: string
    size: size
    spaceChairs: number,
    template: boolean,
    sections: section[]
    elements: element[]
    tables: table[]
}

export interface EditDefaultState {
    item?: table
    itemTipo?: string
    setShowFormEditar?: any
}


export interface guests {
    _id: string
    invitacion: boolean
    fecha_invitacion: string
    estatus: string
    nombre: string
    rol: string
    sexo: string
    grupo_edad: string
    correo: string
    telefono: string
    chairs: any
    nombre_mesa: string
    puesto: string | number
    orden_puesto: string
    asistencia: string
    alergenos: string[]
    nombre_menu: string
    grupo_relacion: string
    chats_array: chat[]
    movil: string
    direccion: string
    poblacion: string
    pais: string
}

export interface filterGuest extends guests {
    planSpaceID: string,
    sectionID: string,
    tableID: string,
    guestID: string,
    chair: number
}

interface menu {
    nombre_menu: string
    tipo: string
}

interface estimate {
    coste_estimado: number
    coste_final: number
    pagado: number
    categorias_array: estimateCategory[]
}

interface cost {
    _id: string
    coste_proporcion: number
    coste_estimado: number
    coste_final: number
    pagado: number
    nombre: string
}
interface estimateCategory extends cost {
    gastos_array: expenses[]
}

interface expenses extends cost {
    pagos_array: pay[]
}

interface pay {
    _id: string
    estado: string
    fecha_creacion: string
    fecha_pago: string
    fecha_vencimiento: string
    medio_pago: string
    importe: number
    pagado_por: string
}

interface image {
    _id: string
    i1024: string
    i800: string
    i640: string
    i320: string
    createdAt: string
}
interface notification {
    _id: string
    fecha_creacion: string,
    fecha_lectura: string
    mensaje: string
}

export interface table {
    _id: string
    nombre_mesa: string
    tipo: string
    posicion: {
        x: number
        y: number
    }
    cantidad_sillas: number
}

export interface guests {
    _id: string
    invitacion: boolean
    fecha_invitacion: string
    estatus: string
    nombre: string
    rol: string
    sexo: string
    grupo_edad: string
    correo: string
    telefono: string
    nombre_mesa: string
    puesto: string | number
    orden_puesto: string
    asistencia: string
    alergenos: string[]
    nombre_menu: string
    grupo_relacion: string
    chats_array: chat[]
    movil: string
    direccion: string
    poblacion: string
    pais: string
}

interface chat {
    _id: string
    tipo: string
    icono: string
    nombre: string
    receptor_id: string
}



export interface signalItem {
    tipo: string;
    invitado: guests;
}