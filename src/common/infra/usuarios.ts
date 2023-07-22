import { Usuario } from '../interfaces/Usuario'
import { CrudService } from '../utils/crudService'

export const UsuariosInfra = CrudService<Usuario>({
  url: 'http://localhost:3000/usuarios/',
  queryKey: 'Usuarios',
})
