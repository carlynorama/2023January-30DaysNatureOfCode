Getting a selection from a set that is weighted proportionally is central to doing genetic algorithms. One solution is to create an array that contains proportional numbers of the values, but that may mean creating and destroying an large array several times.  

Both in [Shiffman's videos](https://www.youtube.com/watch?v=9zfeTw-uFCw&list=PLRqwX-V7Uu6bJM3VgzjNV5YxVxUwzALHV) and in a couple of other places the "[Rejection Sampling](https://en.wikipedia.org/wiki/Rejection_sampling)" algorithm is mentioned. I wanted to make sure I understood it. 

This non-looping sketch creates 10k shapes, based on weights determined at the beginning at each run. 

### Nice video on the topic:

- "Rejection Sampling - VISUALLY EXPLAINED with EXAMPLES!" Kapil Sachdeva https://www.youtube.com/watch?v=si76S7QqxTU   
- "Accept-Reject Sampling : Data Science Concepts" ritvikmath
 https://www.youtube.com/watch?v=OXDqjdVVePY 


### Compare to Inverse Transform Sampling

(smrinoff, inverse cumulative distribution function)
Videos from same channels as above
- https://www.youtube.com/watch?v=d_KiCqW3DTs
- https://www.youtube.com/watch?v=9ixzzPQWuAY
