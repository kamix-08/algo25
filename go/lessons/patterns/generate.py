import string, random

AVIABLE = string.ascii_letters + string.digits + '\n'
NEEDLE = "!dupadupa"
NEEDLE_POSITION = 0.75

def main():
    name  = input("Filename: ")
    count = eval(input("# of chars: "))
    
    needle_idx = int(NEEDLE_POSITION * count)
    
    content = ''.join(random.choices(AVIABLE, k=count))
    content = content[:needle_idx] + NEEDLE + content[needle_idx:]
    
    with open(name, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f"Saved {count} bytes into {name}. Needle at position {needle_idx}")
    
if __name__ == "__main__":
    main()