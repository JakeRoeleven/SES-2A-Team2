import sys, json, numpy, random as np

#Read data from stdin
def read_in():
    
    lines = sys.stdin.readlines()
   
    #Since our input would only be having one line, parse our JSON data from that
    return json.loads(lines[0])

def main():

    # Get data as an array from read_in()
    lines = read_in()

    #create a numpy array
    np_lines = np.array(lines)

    #use numpys sum method to find sum of all elements in the array
    lines_sum = np.sum(np_lines)

    #return the sum to the output stream
    print(np_lines)

#start process
if __name__ == '__main__':
    main()