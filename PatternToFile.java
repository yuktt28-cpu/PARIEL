import java.io.*;
class PatternToFile {
    public static void main(String[] args) {
        try {
            FileOutputStream fis = new FileOutputStream("pattern.txt", false);

            for(int i = 1; i <= 4; i++) {

                for(int j = 1; j <= 4; j++) {
                    fis.write("* ".getBytes());
                }
                fis.write("\n".getBytes());
            }

            fis.close();
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
    }
}