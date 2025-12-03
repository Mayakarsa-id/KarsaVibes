package main

import (
	"encoding/json"
	"fmt"

	"github.com/Mayakarsa-id/KarsaVibes/internal/youtube"
)

func main() {
	featured := youtube.GetFeaturedItems()
	v, _ := json.Marshal(featured)
	fmt.Println(string(v))
}
