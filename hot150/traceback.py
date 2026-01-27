def trace(s:str):
    n = len(s)
    def dfs(i:int):
        # end situation
        if i >= n:
            return 
        if  