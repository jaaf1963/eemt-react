// OJO aqui se maneja el servicio HOST
// 1: para despliegue web y 2: para local
export const srv_host: string[] = [
  "1",
  "/home/eemtcle3/eemtpy.eemt.cl",
  "http://localhost:5055",
];

export default interface IUser {
  id?: any | null;
  username: string;
  password: string;
  eemail: string;
  entity: string;
  roles?: Array<string>;
}

export interface IRegist extends IUser {
  entype?: string;
  subsys?: string;
  enttok?: string;
  entini?: string;
  entend?: string;
  entmai?: string;
  usrmail?: string;
}

//---------------------------------------------------------

interface Option {
  value: string;
  label: string;
}
export const panelOptions: Option[] = [
  { value: "panel1", label: "Panel1" },
  { value: "panel2", label: "Panel2" },
  { value: "panel3", label: "Panel3" },
];

export const entityOptions: Option[] = [
  { value: "EEMT", label: "EEMT Arauco" },
  { value: "ElectricSur", label: "Electric Sur" },
  { value: "TransElec-Chile", label: "TransElec Chile" },
];

export const entypeOptions: Option[] = [
  { value: "estudios", label: "Estudios" },
  { value: "biomasa", label: "Biomasa" },
  { value: "combustible", label: "Combustible" },
  { value: "desaladora", label: "Desaladora" },
  { value: "electrica", label: "Eléctica" },
  { value: "eolica", label: "Eólica" },
  { value: "gasifera", label: "Gasífera" },
  { value: "geotermica", label: "Geotérmica" },
  { value: "hidrica", label: "Hidrica" },
  { value: "solar", label: "Solar" },
  { value: "laboratorio", label: "Laboratorio" },
  { value: "comunitaria", label: "Comunitaria" },
  { value: "informatica", label: "Informática" },
  { value: "educacion", label: "Educación" },
  { value: "estatal", label: "Estatal" },
  { value: "municipio", label: "Municipio" },
  { value: "servicio", label: "Servicio" },
  { value: "otro-tipo", label: "Otro" },
];

export const moduleOptions: Option[] = [
  { value: "view-eemt", label: "View-EEMT" },
  { value: "edit-eemt", label: "Edit-EEMT" },
  { value: "admin-eemt", label: "Admin-EEMT" },
  { value: "comer-eemt", label: "Comer-EEMT" },
  { value: "other-eemt", label: "Other-EEMT" },
];
