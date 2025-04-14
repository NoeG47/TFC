import http from "../serviciosAxiosStorage/http-axios";

class ServicioUsuario {

   //encriptar contraseña
  login(usuario) {
   return http.get(`/usuarios?nombre=${usuario}`)
      //return http.get(`/usuarios?nombre=${usuario}&pass=${pass}`);
      //http://localhost:3000/usuarios?nombre=agustin&pass=123
   }
   registrarUsuario(usuario) {
    return http.post("/usuarios", usuario);
 }
}

export default new ServicioUsuario();
