
import java.util.Random;
import java.io.FileWriter;
import java.io.IOException;
    public class Main{
        public static Integer[] orderedArray(Integer size){
            final Integer[] array=new Integer[size];
            for(Integer i=0;i<size;i++)array[i]=(i);
            return array;
        } 
        public static Integer[] reverseArray(Integer size){
            final Integer[] array=new Integer[size+1];
            for(Integer i=size;i>=0;i--)array[i]=(i);
            return array;
        } 
        public static Integer[] randomArray(Integer size){
            final Integer[] array=new Integer[size];
            for(Integer i=0;i<size;i++){
                Random random= new Random();
                Integer randomInt = random.nextInt(size);
                array[i]=randomInt;
            }
            return array;
        } 
        public static Sorter<Integer> chooseSorting(Integer sortingAlg){
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
        public static Integer[] chooseArray(Integer arrayN,Integer size){
            Integer[] array;
            switch (arrayN) {
                case 1:
                    return array=orderedArray(size);
                case 2:
                    return array=reverseArray(size);
                case 3: 
                    return array=randomArray(size);
                default:
                    throw new AssertionError("Undefined array type");
            }

        }  
        public static void main(String[] args){     
            try (FileWriter writer = new FileWriter("experimental-and-evaluation/Assignment_1/Results.csv", true)) {
                for(Integer i=10;Math.log(i)/Math.log(10)<5;i*=10){
                    for(Integer j=1;j<=3;j++){
                        for(Integer s=1;s<=4;s++){
                            var sortName="bubblesort no change";
                            var arrayName="ordered";
                            if(s==2)sortName="bubblesort while needed";
                            if(s==3)sortName="quicksortgpt";
                            if(s==4)sortName="selectionsortgpt";
                            if(j==2)arrayName="inverse ordered";
                            if(j==3)arrayName="random";
                            long startTime = System.nanoTime();
                            chooseSorting(s).sort(chooseArray(j,i));
                            long endTime = System.nanoTime();  
                            writer.write(i + "," + sortName + "," + arrayName + "," + (endTime - startTime) + "\n");
                        }
                    }
                } 
                } catch (IOException e) {
                    e.printStackTrace();
                } 
        }
    }   