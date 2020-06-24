from collections import deque
from typing import TypeVar, Generic

class Node:
    def __init__(self, item):
        self.item = item
        self.next = None

class SortedList:
    def __init__(self):
        self.head = None
        self.length = 0

    def insert(self, item):
        if self.head == None:
            self.head = Node(item)
            self.length += 1
            return

        if self.head.item < item:
            self.head, self.head.next = Node(item), self.head
            self.length += 1
            return

        curr_node = self.head

        while curr_node.next:
            if curr_node.next.item < item:
                break
            curr_node = curr_node.next

        new_node = Node(item)
        new_node.next = curr_node.next
        curr_node.next = new_node
        self.length += 1

    def remove(self, item):
        if self.head == None:
            return

        if self.head.item == item:
            self.head = self.head.next
            self.length -= 1
            return

        curr_node = self.head

        while curr_node.next:
            if curr_node.next.item == item:
                break
            curr_node = curr_node.next

        curr_node.next = None if curr_node.next == None else curr_node.next.next
        self.length -= 1
    
    def slice(self, start, end):
        arr = deque([])

        curr_node = self.head
        i = 0

        while i < start:
            if curr_node == None:
                break
            curr_node = curr_node.next
            i += 1

        while i < end:
            if curr_node == None:
                return arr
            arr.append(curr_node.item)
            curr_node = curr_node.next
            i += 1

        return arr
