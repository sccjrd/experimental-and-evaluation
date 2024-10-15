public final class BubbleSortUntilNoChange<T extends Comparable<T>> implements Sorter<T> {
	
	public void sort(final T[] items) {
		boolean changed;
		do {
			changed = false;
			for (int i = 0; i < items.length - 1; i++) {
				if (items[i].compareTo(items[i + 1]) > 0) {
					final T item = items[i];
					items[i] = items[i + 1];
					items[i + 1] = item;
					changed = true;
				}
			}
		} while (changed);
	}
	
}
