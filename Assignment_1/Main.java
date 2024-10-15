    import java.util.Random;
import java.util.random.*;
    public class Main{
        public static Integer[] orderedArray(Integer size){
            final Integer[] array=new Integer[size];
            for(Integer i=0;i<size;i++)array[i]=(i);
            return array;
        } 
        public static Integer[] reverseArray(Integer size){
            final Integer[] array=new Integer[size];
            for(Integer i=size;i>=0;i--)array[i]=(i);
            return array;
        } 
        public static Integer[] randomArray(Integer size){
            final Integer[] array=new Integer[size];
            for(Integer i=0;i<size;i++){
                Random random= new Random();
                Integer randomInt = random.nextInt(100);
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
                    throw new AssertionError("Errore critico generato apposta!");
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
                    throw new AssertionError("Errore critico generato apposta!");
            }

        }  
        public static void main(String[] args){

            for(Integer i=1;i<=4;i++){
                long startTime = System.nanoTime();

                //bubblesortnochange=1
                //bubblesortwhileneeded=2
                //quicksortgpt=3
                //selectionsortgpt=4
                
                chooseSorting(i).sort(orderedArray(10));
                long endTime = System.nanoTime();  
                System.out.println("It took " + (endTime - startTime)+"ns");
            }
        } 
    }