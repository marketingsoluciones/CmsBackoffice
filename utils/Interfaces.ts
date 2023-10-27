
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
    mesas_array: table[]
    grupos_array: string[]
    notificaciones_array: notification[]
    imgInvitacion: image
    presupuesto_objeto: estimate
    listaRegalos: string
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