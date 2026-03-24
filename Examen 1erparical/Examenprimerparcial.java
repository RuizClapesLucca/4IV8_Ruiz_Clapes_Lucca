import java.util.Scanner;
public class Examenprimerparcial{
    public static void main(String[] args) {
        Scanner sc = new Scanner (System.in);
        boolean datosregistrados=false;
        Boolean salir = false;
        int opcion;

        String nombre="";
        String apellidopaterno="";
        String apellidomaterno="";
        String fechadenacimiento="";

        while(!salir){
            System.out.println(" 1-Registrar nombre");
            System.out.println("2-Calculo de volumen del  cilindro");
            System.out.println("3-Salir y mostar");
            System.out.println ("4-salir sin mostar");
            opcion=sc.nextInt();
            sc.nextLine();

            double volCilindro;
            switch (opcion) {
                case 1:
                System.out.println("\n--- REGISTRO DE DATOS ---");
                    System.out.print("Ingresa tu(s) nombre(s): ");
                    nombre = sc.nextLine();
                    
                    System.out.print("Ingresa tu apellido paterno: ");
                    apellidopaterno = sc.nextLine();
                    
                    System.out.print("Ingresa tu apellido materno: ");
                    apellidomaterno = sc.nextLine();
                    
                    System.out.print("Ingresa tu fecha de nacimiento (ej. 01/01/2000): ");
                    fechadenacimiento = sc.nextLine();
                    datosregistrados= true;
                    
                    System.out.println("¡Datos guardados con éxito!");
                    break;  
                case 2 :
                    System.out.println("Calculo de volumene de cilindros");  
                    double pi=3.1416;
                    System.out.println("radio del cilindro");
                    double rCil = sc.nextDouble();
                    System.out.println("Altura del cilindro");
                    double hCil= sc.nextDouble();
                    volCilindro=pi*rCil*hCil;
                    System.out.println("El volumen del cilindro es: " + volCilindro);
                    break;
                    case 3 :
                    if (datosregistrados) 
                    { 
                    System.out.println("\n--- DATOS DEL USUARIO ---");
                    System.out.println("Nombre: " + nombre); 
                    System.out.println("Apellido Paterno: " + apellidopaterno); 
                    System.out.println("Apellido Materno: " + apellidomaterno); 
                    System.out.println("Fecha de Nacimiento: " + fechadenacimiento);
                    } 
                    else { System.out.println("No hay datos registrados.");
                    } 
                    System.out.println("Saliendo del programa..."); 
                    salir = true; 
                    default:
                    System.out.println("Opcion no valida");
                    break;

                
            } 

        }


                
            } 
            }

        

