import java.util.Random;
import java.io.FileWriter;
import java.io.IOException;
    public class Main{

        // Int array
        public static Integer[] orderedIntArray(Integer size){
            final Integer[] array=new Integer[size];
            for(Integer i=0;i<size;i++)array[i]=(i);
            return array;
        } 
        public static Integer[] reverseIntArray(Integer size){
            final Integer[] array=new Integer[size+1];
            for(Integer i=size;i>=0;i--)array[i]=(i);
            return array;
        } 
        public static Integer[] randomIntArray(Integer size){
            final Integer[] array=new Integer[size];
            for(Integer i=0;i<size;i++){
                Random random= new Random();
                Integer randomInt = random.nextInt(size);
                array[i]=randomInt;
            }
            return array;
        }

        // String array
        public static String[] orderedStringArray(Integer size){
            final String[] array=new String[size];
            for(Integer i=0;i<size;i++)array[i]=i.toString();
            return array;
        }

        public static String[] reverseStringArray(Integer size){
            final String[] array=new String[size+1];
            for(Integer i=size;i>=0;i--)array[i]=i.toString();
            return array;
        }

        public static String[] randomStringArray(Integer size){
            final String[] array=new String[size];
            for(Integer i=0;i<size;i++){
                Random random= new Random();
                String randomString = Integer.toString(random.nextInt(size));
                array[i]=randomString;
            }
            return array;
        }


        // Choose array
        public static <T> T[] chooseArray(Class<T> type,Integer i, Integer size){
            if(type==Integer.class){
                switch (i) {
                    case 1:
                        return (T[])orderedIntArray(size);
                    case 2:
                        return (T[])reverseIntArray(size);
                    case 3:
                        return (T[])randomIntArray(size);
                    default:
                         throw new AssertionError("Undefined array type");
                }
            }
            if(type==String.class){
                switch (i) {
                    case 1:
                        return (T[])orderedStringArray(size);
                    case 2:
                        return (T[])reverseStringArray(size);
                    case 3:
                        return (T[])randomStringArray(size);
                    default:
                    throw new AssertionError("Undefined array  type");
                }
            }
            throw new AssertionError("Undefined Class type");
        }

        // Choose sorting
        public static Sorter<Integer> chooseSortingInteger(Integer sortingAlg){
            Sorter<Integer> sorting;
            switch (sortingAlg) {
                case 1:
                    return sorting=new BubbleSortUntilNoChange<>();
                case 2:
                    return sorting=new BubbleSortWhileNeeded<>();
                case 3:
                    return sorting=new QuickSortGPT<>();
                case 4:
                    return sorting=new SelectionSortGPT<>();
                default:
                    throw new AssertionError("Undefined sorting algorithm");
            }
        }

        public static Sorter<String> chooseSortingString(Integer sortingAlg){
            Sorter<String> sorting;
            switch (sortingAlg) {
                case 1:
                    return sorting=new BubbleSortUntilNoChange<>();
                case 2:
                    return sorting=new BubbleSortWhileNeeded<>();
                case 3:
                    return sorting=new QuickSortGPT<>();
                case 4:
                    return sorting=new SelectionSortGPT<>();
                default:
                    throw new AssertionError("Undefined sorting algorithm");
            }
        }
        
        public static void main(String[] args){     
            try (FileWriter writer = new FileWriter("ResultsInteger.csv", true)) {
                Integer[] sizes = {20, 400, 10000};
                int i=0;
                writer.write("Iteration, ArraySize,Algorithm,Type,Time(ns)\n");
                for(Integer size:sizes){                    
                    for(Integer s=1;s<=4;s++){
                        for(Integer iteration=0;iteration<100;iteration++){
                            for(Integer t=1;t<=3;t++){
                                var sortName="bubblesort no change";
                                var arrayName="ordered";
                                if(s==2)sortName="bubblesort while needed";
                                if(s==3)sortName="quicksortgpt";
                                if(s==4)sortName="selectionsortgpt";
                                if(t==2)arrayName="inverse ordered";
                                if(t==3)arrayName="random";

                                Sorter<Integer> sorting=chooseSortingInteger(s);
                                Integer [] array = chooseArray(Integer.class,t,size);

                                long startTime = System.nanoTime();
                                sorting.sort(array);
                                long endTime = System.nanoTime();

                                writer.write(i + "," + size + "," + sortName + "," + arrayName + "," + (endTime - startTime) + "\n");
                                i++;
                            }
                        }
                    }
                }
            } catch (IOException e) {
                    e.printStackTrace();
            }
            try (FileWriter writer = new FileWriter("ResultsString.csv", true)) {
                Integer[] sizes = {20, 400, 10000};
                int i=0;
                writer.write("Iteration, ArraySize,Algorithm,Type,Time(ns)\n");
                for(Integer size:sizes){
                    for(Integer s=1;s<=4;s++){
                            for(Integer iteration=0;iteration<100;iteration++){
                                for(Integer j=1;j<=3;j++){
                                var sortName="bubblesort no change";
                                var arrayName="ordered";
                                if(s==2)sortName="bubblesort while needed";
                                if(s==3)sortName="quicksortgpt";
                                if(s==4)sortName="selectionsortgpt";
                                if(j==2)arrayName="inverse ordered";
                                if(j==3)arrayName="random";

                                Sorter<String> sorting=chooseSortingString(s);
                                String [] array = chooseArray(String.class,j,size);
                                
                                long startTime = System.nanoTime();
                                sorting.sort(array);
                                long endTime = System.nanoTime();  

                                writer.write(i + "," + size + "," + sortName + "," + arrayName + "," + (endTime - startTime) + "\n");
                                i++;
                            }
                        }
                    }
                }
            } catch (IOException e) {
                    e.printStackTrace();
            }
        }
    }   