create a virtualenv (don't check it in though)

```py
virtualenv some_dir_name -p /path/to/python
```

activate said environment

```source <dirname>/bin/activate```

deactivate said environment (from inside env)

```deactivate```

install some junk

```pip install someLib```

output/package requirments

```pip freeze > requirements.txt```

install requirements
```pip install -r requirements.txt```

see methods available on some object
```dir(<value>) ex. str = 'some string' // dir(str)```
see how to actually use the methods
```help(<value>.<method>)```

see the reference id of any var we create. primitive and tuples are immutable so a reassignment creates another id


```id(str) // <some id>```


List ` a =['a', 'b', 3, 4]`

Dict `{ 'name': 'brookes', 'age': 38 }`

Tuple `('a', 'b', 3, 4)` //immutable

Set `{'a', 'b', 3, 4, 4, 'a'}` //removes dupes. add/remove/union 

init an empty set `s = set()`

convert a string to an integer 
```py
b = '5' 
c = int(b)
```


### Modules
create a file and use its functions as a module. This can be 
```py
# tax.py
def plus_tax(amt):
  return amt * 1.07

# using_tax.py
import tax
total = tax.plus_tax(5.50)
```

can use the same file as an command line or module
```py
# tax.py
def plus_tax(amt):
  return amt * 1.07

# as opposed to "tax", cuz its called from command line
if __name__ == "__main__"
  import sys
  return(print(plus_tax(sys.argv[1])))
```